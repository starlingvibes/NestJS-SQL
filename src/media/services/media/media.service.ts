import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from 'src/entity/Media';
import { createMediaParams } from 'src/utils/types';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media) private mediaRepository: Repository<Media>,
  ) {}

  // fetchAllMedia() {
  //   return this.mediaRepository.find();
  // }

  findSingleMedia(id: string) {
    return this.mediaRepository.findBy({ id });
  }

  searchMediaByNameAndDescription(query: string) {
    return this.mediaRepository
      .createQueryBuilder('media')
      .where('media.name LIKE :query OR media.description LIKE :query', {
        query: `%${query}%`,
      })
      .getMany();
  }

  async fetchMediaPaginatedList(
    page: number,
    perPage: number,
  ): Promise<Media[]> {
    const [mediaItems, count] = await this.mediaRepository.findAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
    });
    const totalPages = Math.ceil(count / perPage);
    return mediaItems;
    // return this.mediaRepository.find({ skip, take });
  }

  createMedia(mediaDetails: createMediaParams) {
    const newMedia = this.mediaRepository.create({
      ...mediaDetails,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.mediaRepository.save(newMedia);
  }

  updateStatus(id: string, status: string) {
    return this.mediaRepository.update(
      { id },
      { status, updatedAt: new Date() },
    );
  }

  async deleteMedia(id: string) {
    const result = await this.mediaRepository.softDelete({ id });
    return { affected: result.affected };
  }
}

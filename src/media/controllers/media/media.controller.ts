import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMediaDto } from 'src/dtos/CreateMedia.dto';
import { UpdateMediaDto } from 'src/dtos/UpdateMedia.dto';
import { MediaService } from 'src/media/services/media/media.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  // NOTE:! Commented out because we're using pagination

  // @ApiTags()
  // @ApiOperation({ summary: 'Fetch all media' })
  // @Get()
  // async getMedia() {
  //   try {
  //     const data = await this.mediaService.fetchAllMedia();
  //     return {
  //       status: 'success',
  //       message: 'Media fetched successfully',
  //       data,
  //     };
  //   } catch (error) {
  //     return {
  //       status: 'error',
  //       message: 'Error fetching media',
  //       data: null,
  //     };
  //   }
  // }

  @ApiTags()
  @ApiOperation({ summary: 'Search media by name and description' })
  @Get('search')
  async searchByNameAndDescription(@Query('query') query: string) {
    try {
      const data = await this.mediaService.searchMediaByNameAndDescription(
        query,
      );
      return {
        status: 'success',
        message: 'Database search query executed successfully',
        data,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Error executing database search query',
        data: null,
      };
    }
  }

  @ApiTags()
  @ApiOperation({ summary: 'Fetch paginated list of media' })
  @Get()
  async fetchPaginatedList(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    try {
      const data = await this.mediaService.fetchMediaPaginatedList(
        page,
        perPage,
      );
      return {
        status: 'success',
        message: 'Successfully fetched paginated list',
        data,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Error fetching paginated list',
        data: null,
      };
    }
  }

  @ApiTags()
  @ApiOperation({ summary: 'Fetch single media' })
  @Get(':id')
  async getSingleMedia(@Param('id') id: string) {
    try {
      const data = await this.mediaService.findSingleMedia(id);
      return {
        status: 'success',
        message: 'Media fetched successfully!',
        data,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Error fetching media',
        data: null,
      };
    }
  }

  @ApiTags()
  @ApiOperation({ summary: 'Create media object' })
  @Post()
  async createMedia(@Body() createMediaDto: CreateMediaDto) {
    try {
      const data = await this.mediaService.createMedia(createMediaDto);
      return {
        status: 'success',
        message: 'Media created successfully',
        data,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Error creating media',
        data: null,
      };
    }
  }

  @ApiTags()
  @ApiOperation({ summary: 'Update media object' })
  @Patch(':id')
  async updateMediaStatus(
    @Param('id') id: string,
    @Body() updateMediaDto: UpdateMediaDto,
  ) {
    try {
      const { status } = updateMediaDto;
      await this.mediaService.updateStatus(id, status);
      return {
        status: 'success',
        message: 'Media updated successfully',
        data: null,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Error updating media',
        data: null,
      };
    }
  }

  @ApiTags()
  @ApiOperation({ summary: 'Delete media object' })
  @Delete(':id')
  async deleteMediaById(@Param('id') id: string) {
    try {
      await this.mediaService.deleteMedia(id);
      return {
        status: 'success',
        message: 'Media deleted successfully',
        data: `Deleted media with id: ${id}`,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Error deleting  media',
        data: null,
      };
    }
  }
}

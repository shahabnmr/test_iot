import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SignalService } from './signal.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSignalDto } from './dto/create-signal.dto';
import { QueryDto } from './dto/get-signal.dto';
import { ParamsDto } from './dto/params-signal.dto';

@ApiTags('X-ray')
@Controller('signals')
export class SignalController {
  constructor(private readonly signalService: SignalService) {}

  @Post()
  @ApiOperation({ summary: 'Store new X-ray signal' })
  @ApiResponse({
    status: 201,
    description: 'X-ray signal stored successfully.',
  })
  async create(@Body() createSignalDto: CreateSignalDto) {
    console.log(createSignalDto);

    return this.signalService.create(createSignalDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all X-ray signals' })
  @ApiResponse({ status: 200, description: 'List of X-ray signals.' })
  async getAllSignals(@Query() query: QueryDto) {
    return this.signalService.getFiltered(
      query.deviceId,
      query.startTime,
      query.endTime,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an X-ray signal by ID' })
  @ApiResponse({
    status: 200,
    description: 'X-ray signal retrieved successfully.',
  })
  async getSignalById(@Param() params: ParamsDto) {
    return this.signalService.getById(params.id);
  }
}

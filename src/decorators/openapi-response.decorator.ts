import { RESPONSE_STATUS_MESSAGE } from '@/utils/response-data';
import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function OpenApiResponses(status: Array<number>) {
  const decorators = status.map((code) =>
    ApiResponse({ status: code, description: RESPONSE_STATUS_MESSAGE[code] }),
  );
  return applyDecorators(...decorators);
}

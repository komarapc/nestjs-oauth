import { AuthTokenPayload } from '@/api/auth/auth.schema';
import { HasRoleRepository } from '@/api/has-roles/has-roles.repository';
import { PermissionRepository } from '@/api/permission/permission.repository';
import { PermissionAction } from '@/api/permission/permission.schema';
import { Permission } from '@/entities/master/permission.entity';
import { TokenService } from '@/services/token.service';
import { httpMethodToApiOperation } from '@/utils';
import { responseForbidden } from '@/utils/response-data';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly hasRoleRepo: HasRoleRepository,
    private readonly permissionRepo: PermissionRepository,
  ) {}
  async canActivate(context: ExecutionContext) {
    const message = 'You do not have permission to access this resource';
    const request = context.switchToHttp().getRequest();
    const { headers, url, method } = request;
    console.log('url', url);
    const token = headers.authorization.split(' ')[1];
    const tokenPayload: AuthTokenPayload = this.tokenService.decodeToken(token);
    const resourceOperation = httpMethodToApiOperation(method);
    const [permissions, existUserRole] = await Promise.all([
      this.permissionRepo.getByRole(tokenPayload.role_id),
      this.hasRoleRepo.existUserRoles(
        tokenPayload.user_id,
        tokenPayload.role_id,
      ),
    ]);
    if (!existUserRole || !permissions.length)
      throw new ForbiddenException(responseForbidden(message));
    const inResource = await this.checkUrlInResourcePermission(
      url,
      resourceOperation,
      permissions,
    );
    if (!inResource) throw new ForbiddenException(responseForbidden(message));
    return true;
  }

  async checkUrlInResourcePermission(
    url: string,
    action: string,
    permissions: Permission[],
  ): Promise<boolean> {
    const resourceExist = permissions.find(
      (item) =>
        url.includes(item.resource.path) && // Check if the URL includes the resource path
        item.action.includes(action as PermissionAction),
    );
    return !!resourceExist;
  }
}

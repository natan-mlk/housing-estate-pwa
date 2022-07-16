import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  // permissions: (3) ['ROLE_STAFF', 'PERM_WRITING', 'PERM_READING']
  userRole: string[] = [];

  adminRole: boolean = false;

  constructor() { }

  hasAdminRole(): boolean {
    return this.userRole.some(
      role => role === 'ROLE_STAFF'
    )
  }
}

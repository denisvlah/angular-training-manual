/**
 * AngularCourse
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ApplicationPostSchemasCommunityShortReadSchema } from './application-post-schemas-community-short-read-schema';
import { CommunityThemes } from './community-themes';
import { UserReadSchemaShort } from './user-read-schema-short';


export interface Author1 { 
    id: number;
    username: string;
    avatarUrl?: string;
    subscribersAmount?: number;
    firstName?: string;
    lastName?: string;
    isActive?: boolean;
    stack?: Array<string>;
    city?: string;
    description?: string;
    admin: UserReadSchemaShort;
    name: string;
    themes?: Array<CommunityThemes>;
    tags?: Array<string>;
    bannerUrl?: string;
    createdAt: string;
}


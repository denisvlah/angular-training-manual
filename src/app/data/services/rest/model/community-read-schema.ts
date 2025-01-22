/**
 * AngularCourse
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { CommunityThemes } from './community-themes';
import { ApplicationCommunitySchemasPostReadSchema } from './application-community-schemas-post-read-schema';
import { UserReadSchemaShort } from './user-read-schema-short';


export interface CommunityReadSchema { 
    id: number;
    admin: UserReadSchemaShort;
    name: string;
    themes?: Array<CommunityThemes> | null;
    tags?: Array<string> | null;
    bannerUrl?: string | null;
    avatarUrl?: string | null;
    description?: string | null;
    subscribersAmount?: number | null;
    createdAt: string;
    isJoined?: boolean;
    posts?: Array<ApplicationCommunitySchemasPostReadSchema> | null;
}


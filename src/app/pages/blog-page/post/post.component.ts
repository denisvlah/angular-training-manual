import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ApplicationPostSchemasPostReadSchema } from '../../../data/services/rest';

@Component({
  selector: 'app-post',
  imports: [MaterialModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  
  @Input() post!: ApplicationPostSchemasPostReadSchema;

}

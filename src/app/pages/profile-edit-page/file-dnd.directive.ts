import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appFileDnd]',
})
export class FileDndDirective {

  @Output() onFileDroped = new EventEmitter<File>();

  @HostBinding("class.fileOver")
  fileOver = false;

  @HostListener('dragover', ['$event'])
  onDragOver($event: DragEvent)
  {
    $event.preventDefault();
    $event.stopPropagation();
    this.fileOver = true;
    

  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event: DragEvent)
  {
    $event.preventDefault();
    $event.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop($event: DragEvent)
  {
    $event.preventDefault();
    $event.stopPropagation();
    this.fileOver = false;
    let files = $event.dataTransfer?.files;    
    
    if (files && files.length > 0)
    {    
      this.onFileDroped.emit(files[0]);
    }
  }

}

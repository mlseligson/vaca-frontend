import { Component } from '@angular/core';
import { NgxMasonryModule } from 'ngx-masonry';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-media',
    imports: [NgxMasonryModule, CdkDrag, CdkDropList],
    templateUrl: './media.component.html',
    styleUrl: './media.component.scss'
})
export class MediaComponent {
  items = [
    {
      title: "Look at this photograph..",
      img: {
        src: "/images/13.png",
        alt: "Every time it makes me laugh.."
      }
    }, {
      title: "Fun in the sun",
      img: {
        src: "/images/15.png",
        alt: "that looks fun"
      }
    }
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}

import { Component } from '@angular/core';
import { NgxMasonryModule } from 'ngx-masonry';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [NgxMasonryModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss'
})
export class MediaComponent {
  items = [
    {
      title: "Look at this photograph..",
      img: {
        src: "/api/images/13.png",
        alt: "Every time it makes me laugh.."
      }
    }, {
      title: "Fun in the sun",
      img: {
        src: "/api/images/15.png",
        alt: "that looks fun"
      }
    }
  ]
}

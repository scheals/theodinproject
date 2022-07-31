import { Controller } from '@hotwired/stimulus';
import { kebabCase } from 'lodash';

export default class LessonTocController extends Controller {
  static targets = ['toc', 'lessonContent'];

  static values = {
    itemClasses: String,
  };

  connect() {
    this.buildTocItems();

    this.lessonContentTarget.querySelectorAll('section[id]').forEach((section) => {
      this.tocItemObserver().observe(section);
    });
  }

  tocItemObserver() {
    return (
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          const tocItem = this.tocTarget.querySelector(`li a[href="#${id}"]`).parentElement;

          if (entry.intersectionRatio > 0) {
            tocItem.classList.add('toc-item-active');
          } else {
            tocItem.classList.remove('toc-item-active');
          }
        });
      }, { rootMargin: '-5% 0% -93% 0%' })
    );
  }

  buildTocItems() {
    this.headings().forEach((heading) => {
      this.tocTarget.insertAdjacentHTML('beforeend', this.tocItem(heading));
    });
  }

  headings() {
    return (
      Array
        .from(this.lessonContentTarget.querySelectorAll('h3'))
        .map((heading) => heading.innerText)
        .filter((heading) => heading)
    );
  }

  tocItem(heading) {
    return `<li><a class="${this.itemClassesValue}" href="#${kebabCase(heading)}">${heading}</a></li>`;
  }
}

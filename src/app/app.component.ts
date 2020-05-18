import {
  Component,
  ViewChild,
  AfterViewInit,
  Renderer2,
  OnInit,
  ElementRef,
  Directive,
  TemplateRef,
  ViewChildren,
  QueryList,
  ChangeDetectorRef
} from '@angular/core';

@Directive({
  selector: '[angryEyes]',
})
export class AngryEyesDirective implements AfterViewInit {
  constructor(private renderer: Renderer2, private theElement: ElementRef) {}

  ngAfterViewInit(): void {
    const regex = new RegExp(/angry/, 'ig');
    const replacementImg =
      '<img width="32" alt="Emoji u1f621" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Emoji_u1f621.svg/128px-Emoji_u1f621.svg.png">';

    // Here we're not manipulating an element, just getting it's value
    // Now let's be real, if we were writing copy for our page, we probably wouldn't
    // use a directive to change text in this element, we would just add the formatting in place.
    // If this data came from some type of input, some type of dynamic functionality (coming in a chat room? from an input?)
    // really we would use templating or data binding with the content, and
    // we would get the text there.
    const replacementText = this.theElement.nativeElement.innerHTML.replace(
      regex,
      replacementImg
    );

    // we use innerHTML here because if we use innerText, the HTML won't render.
    this.renderer.setProperty(
      this.theElement.nativeElement,
      'innerHTML',
      replacementText
    );
  }

  setFontSize(size: string) {
    this.renderer.setStyle(this.theElement.nativeElement, 'font-size', size);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'easy-angular-viewchild';

  // a class with @Component or @Directive
  @ViewChild(AngryEyesDirective, { read: AngryEyesDirective, static: false })
  angryEyesElement: AngryEyesDirective;

  // a template reference variable
  @ViewChild('testdecorator', { static: false })
  testDecorator: ElementRef;
  @ViewChild('ourFirstInput', { read: ElementRef, static: false })
  testInput: ElementRef;

  // a TemplateRef
  // use the templates like we do in our code, use random to choose one?
  @ViewChildren(TemplateRef, { read: false })
  ourTemplates: QueryList<ElementRef>[];

  ourTemplate;
  displayedTemplate;

  constructor(private renderer: Renderer2, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // class with @Directive
    // here we set the font size for the element, using a method in the directive
    this.angryEyesElement.setFontSize('2em');
    // end class with directive

    // template reference variable
    // our testDecorator
    // we can do this on a text node - so we get the first child of the div!
    this.renderer.setValue(
      this.testDecorator.nativeElement.firstChild,
      'This was changed by @ViewChild!'
    );

    // our testInput
    // this doesn't have a first child, so let's use setProperty, and set the value
    // this won't work in the real world if we access the value, it will throw an error
    const injectedText = 'The injected value';
    // what is renderer2 setValue used for then?
    this.renderer.setProperty(
      this.testInput.nativeElement,
      'value',
      injectedText
    );
    // end template reference variable

    // start templateref use
    const requestedTemplate = Math.floor(Math.random() * 2);
    this.ourTemplate = this.ourTemplates.filter(
      (element, index) => index === requestedTemplate
    );

    this.displayedTemplate = this.ourTemplate[0];
    this.cdRef.detectChanges();
    // end templateref use
  }
}

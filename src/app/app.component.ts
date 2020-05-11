import {
  Component,
  ViewChild,
  AfterViewInit,
  Renderer2,
  OnInit,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'easy-angular-viewchild';

  // a class with @Component or @Directive
  // a template reference variable
  @ViewChild('testdecorator', { read: false, static: false })
  testDecorator: ElementRef;
  @ViewChild('ourFirstInput', { read: false, static: false })
  testInput: ElementRef;
  // a provider defined in the child tree
  // a provider defined as a string token
  // a TemplateRef

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}
  ngAfterViewInit() {
    // our testDecorator
    this.renderer.setProperty(
      this.testDecorator.nativeElement,
      'innerText',
      'This was changed by @ViewChild!'
    );

    // our testInput
    const injectedText = this.renderer.createText('The injected value');
    // what is renderer2 setValue used for then?
    this.renderer.setValue(this.testInput.nativeElement, injectedText);
  }
}

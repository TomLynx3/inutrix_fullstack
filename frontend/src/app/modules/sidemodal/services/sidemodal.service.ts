import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  TemplateRef,
} from '@angular/core';

import { delay, Subject } from 'rxjs';
import { SidemodalComponent } from '../sidemodal/sidemodal.component';

@Injectable({
  providedIn: 'root',
})
export class SidemodalService {
  //At some point [ComponentFactoryResolver] need to be changed!

  private _componentRef: ComponentRef<SidemodalComponent> | null = null;
  private _modalRef: EmbeddedViewRef<any> | null = null;
  public subject: Subject<SideModalState> = new Subject<SideModalState>();

  constructor(
    private readonly _appRef: ApplicationRef,
    private readonly _injector: Injector,
    private readonly _componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.subject.subscribe((state: SideModalState) => {
      if (state === SideModalState.CLOSED) {
        this._appRef.detachView(this._componentRef?.hostView!);
        this._componentRef?.destroy();
      }
    });
  }

  public open(content: TemplateRef<any>, width?: string) {
    const componentFactory =
      this._componentFactoryResolver.resolveComponentFactory(
        SidemodalComponent
      );
    const componentRef = componentFactory.create(this._injector);

    if (width) {
      componentRef.instance.width = width;
    }

    this._componentRef = componentRef;

    const modalContent = content.createEmbeddedView(this._injector);

    this._modalRef = modalContent;

    this._appRef.attachView(modalContent);

    const domElement = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    domElement
      .querySelector('.modal-content')
      ?.appendChild(modalContent.rootNodes[0]);

    document.querySelector('app-root')?.appendChild(domElement);

    this.subject.next(SideModalState.OPENING);
  }

  public close() {
    this.subject.next(SideModalState.CLOSING);
  }
}
export enum SideModalState {
  OPEN,
  CLOSED,
  CLOSING,
  OPENING,
}

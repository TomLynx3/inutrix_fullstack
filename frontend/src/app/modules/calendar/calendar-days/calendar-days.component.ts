/**
 *
 *
 * @Author
 * @Artjoms_Zerebkovs
 */
import {
  animate,
  AnimationBuilder,
  AnimationPlayer,
  style,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { CustomIcon, IconFamily } from '@ibabylondev/custom-icon';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { debounceTime, Subject } from 'rxjs';
@Component({
  selector: 'calendar-days',
  templateUrl: './calendar-days.component.html',
  styleUrls: ['./calendar-days.component.scss'],
})
export class CalendarDaysComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChildren('element') public itemsView: QueryList<ElementRef> =
    new QueryList<ElementRef>();
  public days: string[] = [];
  public length: number = 0;
  public animates: number[] = [];
  public array: number[] = [];
  public radius: number = 250;
  public timer: number = 250;
  public top: number = 150;
  public minScale: number = 0.5;
  public cellWidth: number = 200;
  public marginTop: number = -(this.top * this.minScale - this.top) / 2;
  private _player: AnimationPlayer | undefined;
  private _currentIndex: number = 0;

  public calendarImg = {
    'background-image': 'url(assets/images/calendar.png)',
  };

  public leftArrow: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'arrow-left'],
  };
  public rightArrow: CustomIcon = {
    iconFamily: IconFamily.FONTAWESOME,
    value: ['fas', 'arrow-right'],
  };

  @Input('days') set _(value: string[]) {
    if (value.length > 0) {
      this.days = value;
      this.length = value.length;
      this.array = new Array(this.length).fill(0).map((_, x) => x);
      this.animates = new Array(this.length * 2 - 2)
        .fill(0)
        .map((_, x) => x)
        .filter((x) => x <= this.length / 2 || x > (3 * this.length) / 2 - 2);
      this._getCurrentDayIndex();
    }
  }

  @Output()
  public onDayChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private readonly _translateService: TranslateService,
    private readonly _builder: AnimationBuilder
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this._getCurrentDayIndex();
    setTimeout(() => {
      this.animateViews(1, this.days.length - this._currentIndex);
    }, 200);
  }
  ngAfterViewInit(): void {
    this.animateViews(1, this.days.length - this._currentIndex);
  }

  ngOnInit(): void {
    moment.locale(this._translateService.currentLang);

    this._getCurrentDayIndex();
  }

  public selectDay(index: number) {
    const position = this.animates[index];
    if (position != 0) {
      const steps =
        position <= this.length / 2
          ? -position
          : 2 * this.length - 2 - position;
      const factor = steps < 0 ? -1 : 1;
      this.animateViews(factor, factor * steps);
      this._currentIndex = index;
      this.onDayChange.emit(this._currentIndex);
    }
  }

  public animateViews(direction: number, steps: number = 1) {
    this.animates.forEach((x: number, index: number) => {
      const pos = this.getMovement(x, direction, steps, this.length);
      const time = this.timer / pos.length;
      const animations = pos.map((x) =>
        this.getAnimation(x, this.length, time)
      );
      const item: ElementRef | undefined = this.itemsView.find(
        (_x, i) => i == index
      );

      const myAnimation = this._builder.build(animations);
      this._player = myAnimation.create(item!.nativeElement);
      this._player.onDone(() => {
        this.animates[index] = pos[pos.length - 1];
      });
      this._player.play();
    });
  }

  public getMovement(
    posIni: number,
    incr: number,
    steps: number,
    length: number
  ) {
    if (steps == 0) return [posIni];
    const pos = [];
    let index = posIni;
    let cont = 0;
    while (cont < steps) {
      index += incr / 2;
      index = (index + 2 * length - 2) % (2 * length - 2);
      if ((index * 2) % 2 == 0) {
        pos.push(index);
        if (index <= length / 2 || index > (3 * length) / 2 - 2) cont++;
      } else pos.push(index);
    }
    return pos;
  }

  getAnimation(pos: number, length: number, timer: number) {
    const angle = (pos * 2 * Math.PI) / (2 * length - 2);
    const scale =
      (1 + this.minScale) / 2 + ((1 - this.minScale) / 2) * Math.cos(angle);
    const applystyle = {
      transform:
        'translate(' +
        this.radius * Math.sin(angle) +
        'px,' +
        (Math.floor(this.top * scale) - this.top) +
        'px) scale(' +
        scale +
        ')',
      'z-index': Math.floor(100 * scale),
    };
    return animate(timer + 'ms', style(applystyle));
  }

  private _getCurrentDayIndex() {
    const today = moment();
    for (let i = 0; i < this.days.length; i++) {
      const formatDay = moment(this.days[i]);

      if (formatDay.isSame(today, 'day')) {
        this.onDayChange.emit(i);
        this._currentIndex = i;

        return;
      }
    }
  }
}

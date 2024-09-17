import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-typing-effect',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './typing-effect.component.html',
  styleUrl: './typing-effect.component.scss'
})
export class TypingEffectComponent implements OnInit {
  @Input() text: string = '';
  @Input() typingSpeed: number = 100;
  @Output() typingComplete: EventEmitter<boolean> = new EventEmitter<boolean>();

  displayedText: string = '';
  isTyping: boolean = true;

  ngOnInit(): void {
    this.typeText();
  }

  typeText() {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < this.text.length) {
        this.displayedText += this.text.charAt(currentIndex);
        currentIndex++;
      } else {
        clearInterval(interval);
        this.isTyping = false;
        this.typingComplete.emit(true);
      }
    }, this.typingSpeed);
  }
}

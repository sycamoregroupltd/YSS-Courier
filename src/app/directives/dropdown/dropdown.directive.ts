import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
    }

    isOpen = false;

    @HostListener('document:click', ['$event.target'])
    openDropdown(target) {
        if (this.elementRef.nativeElement.contains(target)) {
            this.toggleDropdown();
        } else {
            this.closeDropdown();
        }
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        this.closeDropdown();
    }

    toggleDropdown() {
        console.log("toggle dropdown")
        const dropdownMenu = this.elementRef.nativeElement.querySelectorAll('.dropdown-menu');
        if (this.isOpen) {
            this.renderer.removeClass(dropdownMenu[0], 'show');
        } else {
            this.renderer.addClass(dropdownMenu[0], 'show');
        }
        this.isOpen = !this.isOpen;
    }

    closeDropdown() {
        const dropdownMenu = this.elementRef.nativeElement.querySelectorAll('.dropdown-menu');
        this.renderer.removeClass(dropdownMenu[0], 'show');
        this.isOpen = false;
    }
}

import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MenuLinks } from 'src/app/app.constants';
import { Menu } from 'src/app/models/menu';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menus: Menu[];
  form: FormGroup;
  showCollapse: boolean;
  constructor(private masterService: MasterService, private eRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (this.eRef.nativeElement.querySelector('.navbar-nav').contains(event.target) || !this.eRef.nativeElement.contains(event.target)) {
      this.showCollapse = false;
    }
  }

  ngOnInit(): void {
    this.showCollapse = false;
    this.menus = MenuLinks;
    this.form = new FormGroup({
      userSearchField: new FormControl(''),
    });
    this.userSearchFieldControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(value => {
        this.masterService.userSearch.next(value);
    });
  }

  /**
   * userSearchFieldControl
   *
   * @description - returns FormControl object
   */
  get userSearchFieldControl(): AbstractControl {
    return this.form.get('userSearchField');
  }

}

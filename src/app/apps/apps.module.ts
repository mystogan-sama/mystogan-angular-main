import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modal
import { ModalModule } from 'angular-custom-modal';

// sortable
import { SortablejsModule } from '@dustfoundation/ngx-sortablejs';

// headlessui
import { MenuModule } from 'headlessui-angular';

// perfect-scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';

// quill editor
import { QuillModule } from 'ngx-quill';

// fullcalendar
import { FullCalendarModule } from '@fullcalendar/angular';

// tippy
import { NgxTippyModule } from 'ngx-tippy-wrapper';

// datatable
import { DataTableModule } from '@bhplugin/ng-datatable';

// icon
import { IconModule } from 'src/app/shared/icon/icon.module';

import { ScrumboardComponent } from './scrumboard';
import { ContactsComponent } from './contacts';
import { NotesComponent } from './notes';
import { TodolistComponent } from './todolist';
import { InvoicePreviewComponent } from './invoice/preview';
import { InvoiceAddComponent } from './invoice/add';
import { InvoiceEditComponent } from './invoice/edit';
import { CalendarComponent } from './calendar';
import { ChatComponent } from './chat';
import { MailboxComponent } from './mailbox';
import { InvoiceListComponent } from './invoice/list';
import { EmployeeListComponent } from './masterData/employee/list';
import { EmployeePreviewComponent } from './masterData/employee/preview';
import { EmployeeAddComponent } from './masterData/employee/add';
import { EmployeeEditComponent } from './masterData/employee/edit';
import { NgSelectModule } from '@ng-select/ng-select';
import { TextMaskModule } from 'angular2-text-mask';
import { ClassListComponent } from './training/class/list';
import { ClassAddComponent } from './training/class/add';
import { ClassEditComponent } from './training/class/edit';
import { StudentListComponent } from './masterData/student/list';
import { StudentPreviewComponent } from './masterData/student/preview';
import { StudentAddComponent } from './masterData/student/add';
import { StudentEditComponent } from './masterData/student/edit';

const routes: Routes = [
    { path: 'apps/chat', component: ChatComponent, title: 'Chat | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'apps/mailbox', component: MailboxComponent, title: 'Mailbox | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'apps/scrumboard', component: ScrumboardComponent, title: 'Scrumboard | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'apps/contacts', component: ContactsComponent, title: 'Contacts | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'apps/notes', component: NotesComponent, title: 'Notes | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'apps/todolist', component: TodolistComponent, title: 'Todolist | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'apps/invoice/list', component: InvoiceListComponent, title: 'Invoice List | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'apps/invoice/preview', component: InvoicePreviewComponent, title: 'Invoice Preview | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'apps/invoice/add', component: InvoiceAddComponent, title: 'Invoice Add | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'apps/invoice/edit', component: InvoiceEditComponent, title: 'Invoice Edit | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'apps/masterData/employee/list', component: EmployeeListComponent, title: 'List Employee' },
    { path: 'apps/masterData/employee/preview', component: EmployeePreviewComponent, title: 'Preview Employee' },
    { path: 'apps/masterData/employee/add', component: EmployeeAddComponent, title: 'Add Employee' },
    { path: 'apps/masterData/employee/edit/:id', component: EmployeeEditComponent, title: 'Update Employee' },
    { path: 'apps/masterData/student/list', component: StudentListComponent, title: 'List Student' },
    { path: 'apps/masterData/student/preview', component: StudentPreviewComponent, title: 'Preview Student' },
    { path: 'apps/masterData/student/add', component: StudentAddComponent, title: 'Add Student' },
    { path: 'apps/masterData/student/edit/:id', component: StudentEditComponent, title: 'Update Student' },
    { path: 'apps/training/class/list', component: ClassListComponent, title: 'List Class' },
    { path: 'apps/training/class/add', component: ClassAddComponent, title: 'Add Class' },
    { path: 'apps/training/class/edit/:id', component: ClassEditComponent, title: 'Update Class' },
    { path: 'apps/calendar', component: CalendarComponent, title: 'Calendar | VRISTO - Multipurpose Tailwind Dashboard Template' },
];

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule,
        SortablejsModule,
        MenuModule,
        NgSelectModule,
        TextMaskModule,
        NgScrollbarModule.withConfig({
            visibility: 'hover',
            appearance: 'standard',
        }),
        QuillModule.forRoot(),
        FullCalendarModule,
        NgxTippyModule,
        DataTableModule,
        IconModule,
    ],
    declarations: [
        ChatComponent,
        ScrumboardComponent,
        ContactsComponent,
        NotesComponent,
        TodolistComponent,
        InvoiceListComponent,
        InvoicePreviewComponent,
        InvoiceAddComponent,
        InvoiceEditComponent,
        EmployeeListComponent,
        EmployeePreviewComponent,
        EmployeeAddComponent,
        EmployeeEditComponent,
        StudentListComponent,
        StudentPreviewComponent,
        StudentAddComponent,
        StudentEditComponent,
        ClassListComponent,
        ClassAddComponent,
        ClassEditComponent,
        CalendarComponent,
        MailboxComponent,
    ],
})
export class AppsModule {}

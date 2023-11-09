import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FileUploadModule } from 'primeng/fileupload';
import { SplitButtonModule } from 'primeng/splitbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DataViewModule } from 'primeng/dataview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipModule } from 'primeng/chip';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PanelModule,
    InputTextModule,
    MenubarModule,
    ToastModule,
    DialogModule,
    InputTextareaModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    FileUploadModule,
    SplitButtonModule,
    RadioButtonModule,
    DataViewModule,
    ConfirmDialogModule,
    InputNumberModule,
    MultiSelectModule,
    ChipModule,
    ScrollPanelModule,
    CheckboxModule,
    SelectButtonModule,
    PasswordModule,
    TableModule
  ], exports: [
    PanelModule,
    InputTextModule,
    MenubarModule,
    ToastModule,
    DialogModule,
    InputTextareaModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    FileUploadModule,
    SplitButtonModule,
    RadioButtonModule,
    DataViewModule,
    ConfirmDialogModule,
    InputNumberModule,
    MultiSelectModule,
    ChipModule,
    ScrollPanelModule,
    CheckboxModule,
    SelectButtonModule,
    PasswordModule,
    TableModule
  ]
})
export class PrimeNGModule { }

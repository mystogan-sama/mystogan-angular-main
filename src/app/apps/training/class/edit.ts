import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from 'angular-custom-modal';
import { Events, FileUploadWithPreview, ImageAddedEvent } from 'file-upload-with-preview';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { DataIndonesiaService } from 'src/app/service/data-indonesia.service';
import { DataMasterService } from 'src/app/service/dataMaster.service';
import { OperationsService } from 'src/app/service/operations.service';
import Swal from 'sweetalert2';

@Component({
    moduleId: module.id,
    templateUrl: './edit.html',
    styles: [
        `
            .collapse-enter,
            .collapse-leave-to {
                height: 0;
                overflow: hidden;
                transition: height 0.3s ease;
            }
            .collapse-enter-active,
            .collapse-leave-active {
                height: auto;
            }
            .invisible {
                visibility: hidden;
            }
        `,
    ],
    animations: [
        trigger('collapseExpandAnimation', [
            state(
                'void',
                style({
                    height: '0',
                    overflow: 'hidden',
                })
            ),
            state(
                '*',
                style({
                    height: '*',
                })
            ),
            transition(':enter, :leave', [animate('0.3s ease')]),
        ]),
    ],
})
export class ClassEditComponent {
    @ViewChild('modalUpdate') modalUpdate!: ModalComponent;
    @ViewChild('modalAdd') modalAdd!: ModalComponent;
    params: any = {};
    imageUrl: any;
    files: File[] = [];
    searchDesaSubject = new Subject<string>();
    items: any = [];
    selectedFile = null;
    desaList: any[] = [];
    userList: any[] = [];
    unitList: any[] = [];
    unit: any = {};
    pbnList: any[] = [];
    pbn: any = {};
    pendidikanList: any[] = [];
    pendidikan: any = {};
    statusList: any[] = [];
    studentList: any[] = [];
    student: any = {};
    status: any = {};
    selectedStudentId: any;
    selectedStudentbyClass: any;
    isCollapsed = true;
    isCollapsed2 = true;
    isCollapsed2a = true;
    isCollapsed3 = true;
    private imageAddedListener: any;
    mask1 = [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private dataMasterService: DataMasterService,
        private operationService: OperationsService,
        private dataIndonesiaService: DataIndonesiaService
    ) {}
    @ViewChild('datatable') datatable: any;
    search = '';
    cols = [
        { field: 'studentName', title: 'Name' },
        { field: 'id_pbn', title: 'PBN' },
        { field: 'walas', title: 'WALAS' },
        { field: 'trainer', title: 'Trainer' },
        { field: 'metode', title: 'Metode' },
        { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
    ];
    currencyList = [
        'USD - US Dollar',
        'GBP - British Pound',
        'IDR - Indonesian Rupiah',
        'INR - Indian Rupee',
        'BRL - Brazilian Real',
        'EUR - Germany (Euro)',
        'TRY - Turkish Lira',
    ];
    selectedCurrency = 'USD - US Dollar';
    tax = 0;
    discount = 0;
    shippingCharge = 0;
    paymentMethod = 'bank';

    ngOnInit() {
        this.searchDesaSubject
            .pipe(
                debounceTime(300), // Menunda request sampai 300ms setelah pengguna berhenti mengetik
                distinctUntilChanged(), // Menghindari request yang sama berturut-turut
                switchMap((query: string) => this.dataIndonesiaService.searchDesa(query))
            )
            .subscribe(
                (data) => {
                    this.desaList = data;
                    console.log(this.desaList);
                },
                (error) => {
                    console.error('Error searching desa', error);
                }
            );
        //set default data
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.getClassData(+id);
        }

        if (id) {
            this.getClassDetData(+id);
        }

        window.addEventListener(Events.IMAGE_ADDED, (e: Event) => {
            const { detail } = e as unknown as ImageAddedEvent;
            this.files = detail.cachedFileArray;
        });

        this.getUser();
        this.getPbn();
        this.getPendidikan();
        this.getStatus();
    }

    getUser(): void {
        this.dataMasterService.getMembers().subscribe(
            (data) => {
                this.userList = data;
            },
            (error) => {
                console.error('Error fetching unit', error);
            }
        );
    }

    getUnit(): void {
        this.dataMasterService.getUnit().subscribe(
            (data) => {
                this.unitList = data;
            },
            (error) => {
                console.error('Error fetching unit', error);
            }
        );
    }

    getPbn(): void {
        this.dataMasterService.getPbn().subscribe(
            (data) => {
                this.pbnList = data;
            },
            (error) => {
                console.error('Error fetching pbn', error);
            }
        );
    }

    getPendidikan(): void {
        this.dataMasterService.getPendidikan().subscribe(
            (data) => {
                this.pendidikanList = data;
            },
            (error) => {
                console.error('Error fetching pendidikan', error);
            }
        );
    }

    getStatus(): void {
        this.dataMasterService.getStatus().subscribe(
            (data) => {
                this.statusList = data;
            },
            (error) => {
                console.error('Error fetching status', error);
            }
        );
    }

    getClassData(id: number): void {
        this.operationService.getClassbyId(id).subscribe((response) => {
            this.params = response;
        });
    }

    getClassDetData(selectedStudentbyClass: number): void {
        this.operationService.getClassDetbyClass(selectedStudentbyClass).subscribe((response) => {
            this.studentList = response;
            console.log(this.studentList);
        });
    }

    getClassDetbyId(selectedStudentId: number): void {
        this.operationService.getClassDetbyId(selectedStudentId).subscribe((response) => {
            this.student = response;
        });
    }

    changeStudent(selectedStudent: any): void {
        this.student.studentName = selectedStudent.nama_lengkap;
        this.student.id_pbn = selectedStudent.id_pbn;
    }

    openAddModal(): void {
            this.modalAdd.open();
            this.student.id_class = this.params.id
            // this.getClassDetbyId(selectedStudentId);
    }

    addClassDet(): void {
        this.operationService.createClassDet(this.student).subscribe((response) => {
            this.modalAdd.close();
            this.showMessage('Add Data Successful!', 'top-end', 'success');
            this.getClassDetData(this.student.id_class);
        });
    }

    openUpdateModal(selectedStudentId: number): void {
        this.operationService.getClassDetbyId(selectedStudentId).subscribe((response) => {
            this.studentList = response;
            this.modalUpdate.open();
            this.getClassDetbyId(selectedStudentId);
        });
    }

    updateClassDet(selectedStudentId: number): void {
        this.operationService.updateClassDet(selectedStudentId, this.student).subscribe((response) => {
            this.modalUpdate.close();
            this.showMessage('Update Data Successful!', 'top-end', 'success');
            this.getClassDetData(this.student.id_class);
        });
    }

    toggleForm() {
        this.isCollapsed = !this.isCollapsed;
    }

    toggleForm2() {
        this.isCollapsed2 = !this.isCollapsed2;
    }

    toggleForm2a() {
        this.isCollapsed2a = !this.isCollapsed2a;
    }

    toggleForm3() {
        this.isCollapsed3 = !this.isCollapsed3;
    }

    toggleDateField(field: string, event: any) {
        this.student[field] = event ? 1 : 0;
    }

    updateClass() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.operationService.updateClass(+id, this.params).subscribe((response) => {
                this.router.navigate(['/apps/training/class/list']);
                this.showMessage('Update Data Successful!', 'top-end', 'success');
            });
        } else {
            console.error('ID is null');
            this.showMessage('Update Data Unsuccessful!', 'top-end', 'error');
        }
    }

    private showMessage(
        msg: string,
        position: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' = 'bottom-start',
        icon: 'success' | 'error' | 'warning' | 'info' | 'question' = 'info',
        showCloseButton = true,
        closeButtonHtml = '',
        duration = 3000
    ) {
        const toast = Swal.mixin({
            toast: true,
            position: position || 'bottom-start',
            showConfirmButton: false,
            timer: duration,
            showCloseButton: showCloseButton,
            background: icon === 'success' ? '#228B22' : icon === 'error' ? '#8B0000' : '', // Hijau untuk sukses, merah untuk error
        });
        toast.fire({
            title: msg,
            icon: icon,
        });
    }

    deleteRow(id: number): void {
        this.showAlert(id);
    }

    showAlert(id: number): void {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                popup: 'sweet-alerts',
                confirmButton: 'btn btn-secondary',
                cancelButton: 'btn btn-dark ltr:mr-3 rtl:ml-3',
            },
            buttonsStyling: false,
        });
    
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            html: `
                <input type="text" id="delete-input" class="swal2-input" placeholder="Type 'delete' to confirm">
            `,
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            preConfirm: (): any => {
                const deleteInput = (Swal.getPopup()!.querySelector('#delete-input') as HTMLInputElement).value;
                if (deleteInput !== 'delete') {
                    Swal.showValidationMessage('You need to type "delete" to confirm');
                    return false;
                } else {
                    return true;
                }
            },
            didOpen: () => {
                const confirmButton = Swal.getConfirmButton();
                const deleteInput = Swal.getPopup()!.querySelector('#delete-input') as HTMLInputElement;
    
                deleteInput.addEventListener('input', () => {
                    confirmButton!.disabled = deleteInput.value !== 'delete';
                });
    
                confirmButton!.disabled = true;
            },
            padding: '2em',
        }).then((result) => {
            if (result.isConfirmed) {
                this.operationService.deleteClassDet(id).subscribe(
                    () => {
                        swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
                        this.getClassDetData(this.params.id);
                    },
                    (error) => {
                        swalWithBootstrapButtons.fire('Error', 'There was a problem deleting your file.', 'error');
                        console.error('Error deleting employee', error);
                    }
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
            }
        });
    }
}

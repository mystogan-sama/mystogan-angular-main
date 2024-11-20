import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'angular-custom-modal';
import { Events, FileUploadWithPreview, ImageAddedEvent } from 'file-upload-with-preview';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { DataIndonesiaService } from 'src/app/service/data-indonesia.service';
import { DataMasterService } from 'src/app/service/dataMaster.service';
import Swal from 'sweetalert2';

@Component({
    moduleId: module.id,
    templateUrl: './add.html',
})
export class StudentAddComponent {
    @ViewChild('modal2') modal!: ModalComponent;
    unitList: any[] = [];
    desaList: any[] = [];
    desa: any = {};
    unit: any = {};
    pbnList: any[] = [];
    pbn: any = {};
    pendidikanList: any[] = [];
    pendidikan: any = {};
    statusList: any[] = [];
    status: any = {};
    showModal = false;
    files: File[] = [];
    imageUrl: any;
    private imageAddedListener: any;
    searchDesaSubject = new Subject<string>();
    mask1 = [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-',/\d/, /\d/, /\d/, /\d/];

    constructor(private dataIndonesiaService: DataIndonesiaService, public router: Router, private dataMasterService: DataMasterService) {}
    items: any = [];
    selectedFile = null;
    params: any = {};
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
    tax: number | undefined;
    discount: number | undefined;
    shippingCharge: number | undefined;
    paymentMethod = '';

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
                },
                (error) => {
                    console.error('Error searching desa', error);
                }
            );
        //set default data
        this.getUnit();
        this.getPbn();
        this.getPendidikan();
        this.getStatus();
        // single image upload
    }

    openModal() {
        this.modal.open();

        // Inisialisasi file upload saat modal terbuka
        setTimeout(() => {
            const upload = new FileUploadWithPreview('myFirstImage', {
                images: {
                    baseImage: '/assets/images/file-preview.svg',
                    backgroundImage: '',
                },
            });
            this.imageAddedListener = (e: Event) => this.onImageAdded(e);
            window.addEventListener(Events.IMAGE_ADDED, this.imageAddedListener);
        }, 500); // Waktu timeout disesuaikan dengan waktu yang diperlukan modal untuk terbuka sepenuhnya
    }

    onImageAdded(event: Event) {
        const { detail } = event as unknown as ImageAddedEvent;
        console.log('Image added details:', detail);
        this.files = detail.cachedFileArray; // Simpan file yang diunggah
    }

    closeModal() {
        this.showModal = false;
    }

    onSelect(event: { addedFiles: any }) {
        this.files.push(...event.addedFiles);
        this.onUpload();
    }

    async onUpload() {
        if (!this.files.length) {
            return; // Berhenti jika tidak ada file yang diunggah
        }

        const file_data = this.files[0]; // Menggunakan file pertama dari array
        const data = new FormData();
        data.append('file', file_data);
        data.append('upload_preset', 'angular_cloudinary');
        data.append('cloud_name', 'insabaaset');

        this.dataMasterService.uploadImage(data).subscribe((response) => {
            if (response) {
                this.imageUrl = response.url;
                this.params.foto = this.imageUrl;
                console.log(this.imageUrl);

                // Close the modal after successful upload
                this.modal.close();
                this.showMessage('Upload Successful!', 'top-end', 'success');
            }
        });
    }

    getUnit(): void {
        this.dataMasterService.getUnit().subscribe(
            (data) => {
                this.unitList = data;
                console.log(this.unitList);
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
                console.log(this.pbnList);
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
                console.log(this.pendidikanList);
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
                console.log(this.statusList);
            },
            (error) => {
                console.error('Error fetching status', error);
            }
        );
    }

    changeDesa(selectedDesa: any): void {
        this.params.provinsi = selectedDesa.province;
        this.params.kabupaten = selectedDesa.regency;
        this.params.kecamatan = selectedDesa.district;
    }

    save() {
        this.dataMasterService.createMember(this.params).subscribe(
            (response) => {
                this.router.navigate(['/apps/masterData/employee/list']);
                this.showMessage('Create Data Successful!', 'top-end', 'success');
            },
            (error) => {
                this.showMessage('Create Data Error!', 'top-end', 'error');
            }
        );
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

    delete(id: number) {
        this.dataMasterService.deleteMember(id).subscribe(
            (response) => {
                console.log('Employee deleted successfully', response);
            },
            (error) => {
                console.error('Error deleting employee', error);
            }
        );
    }

    addItem() {
        let maxId = 0;
        if (this.items && this.items.length) {
            maxId = this.items.reduce((max: number, character: any) => (character.id > max ? character.id : max), this.items[0].id);
        }
        this.items.push({
            id: maxId + 1,
            title: '',
            description: '',
            rate: 0,
            quantity: 0,
            amount: 0,
        });
    }

    removeItem(item: any = null) {
        this.items = this.items.filter((d: any) => d.id != item.id);
    }
}

import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from 'angular-custom-modal';
import { Events, FileUploadWithPreview, ImageAddedEvent } from 'file-upload-with-preview';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { DataIndonesiaService } from 'src/app/service/data-indonesia.service';
import { DataMasterService } from 'src/app/service/dataMaster.service';
import Swal from 'sweetalert2';

@Component({
    moduleId: module.id,
    templateUrl: './edit.html',
})
export class StudentEditComponent {
    @ViewChild('modal2') modal!: ModalComponent;
    params: any = {};
    imageUrl: any;
    files: File[] = [];
    searchDesaSubject = new Subject<string>();
    items: any = [];
    selectedFile = null;
    desaList: any[] = [];
    unitList: any[] = [];
    unit: any = {};
    pbnList: any[] = [];
    pbn: any = {};
    pendidikanList: any[] = [];
    pendidikan: any = {};
    statusList: any[] = [];
    status: any = {};
    private imageAddedListener: any;
    mask1 = [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-',/\d/, /\d/, /\d/, /\d/];


    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private dataMasterService: DataMasterService,
        private dataIndonesiaService: DataIndonesiaService
    ) {}
    // params = {
    //     title: 'Tailwind',
    //     invoiceNo: '#0001',
    //     to: {
    //         name: 'Jesse Cory',
    //         email: 'redq@company.com',
    //         address: '405 Mulberry Rd. Mc Grady, NC, 28649',
    //         phone: '(128) 666 070',
    //     },

    //     invoiceDate: new Date().toString(),
    //     dueDate: '',
    //     bankInfo: {
    //         no: '1234567890',
    //         name: 'Bank of America',
    //         swiftCode: 'VS70134',
    //         country: 'United States',
    //         ibanNo: 'K456G',
    //     },
    //     notes: 'It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!',
    // };
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
        this.searchDesaSubject.pipe(
            debounceTime(300), // Menunda request sampai 300ms setelah pengguna berhenti mengetik
            distinctUntilChanged(), // Menghindari request yang sama berturut-turut
            switchMap((query: string) => this.dataIndonesiaService.searchDesa(query))
          ).subscribe(
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
            this.getEmployeeData(+id);
        }

        window.addEventListener(Events.IMAGE_ADDED, (e: Event) => {
            const { detail } = e as unknown as ImageAddedEvent;
            this.files = detail.cachedFileArray;
        });

        this.getUnit();
        this.getPbn();
        this.getPendidikan();
        this.getStatus();
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


    getEmployeeData(id: number): void {
        this.dataMasterService.getMembersbyId(id).subscribe((response) => {
            this.params = response;
        });
    }

    openModal() {
        this.modal.open();
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

    async onUpload() {
        if (!this.files[0]) {
            return; // Berhenti jika tidak ada file yang diunggah
        }

        for (let i = 0; i < this.files.length; i++) {
            const file_data = this.files[i];
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
    }

    changeDesa(selectedDesa: any): void {
        this.params.provinsi = selectedDesa.province;
        this.params.kabupaten = selectedDesa.regency;
        this.params.kecamatan = selectedDesa.district;
    }

    save() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.dataMasterService.updateMember(+id, this.params).subscribe((response) => {
                console.log('Data berhasil diperbarui:', response);
                this.router.navigate(['/apps/masterData/student/list']);
                this.showMessage('Update Data Successful!', 'top-end', 'success');
            }, (error) => {
                console.error('Error updating data', error);
                this.showMessage('Update Data Unsuccessful!', 'top-end', 'error');
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
}

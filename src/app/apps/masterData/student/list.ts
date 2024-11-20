import { Component, ViewChild } from '@angular/core';
import { DataMasterService } from 'src/app/service/dataMaster.service';
import Swal from 'sweetalert2';

@Component({
    moduleId: module.id,
    templateUrl: './list.html',
})
export class StudentListComponent {
    members: any[] = [];
    member: any = {};
    pbn: any[] = [];
    pendidikan: any[] = [];
    role: any[] = [];
    rolePermission: any[] = [];
    status: any[] = [];
    unit: any[] = [];
    users: any[] = [];

    constructor(private dataMasterService: DataMasterService) {}
    @ViewChild('datatable') datatable: any;
    search = '';
    cols = [
        { field: 'nama_lengkap', title: 'Name' },
        { field: 'jenis_kelamin', title: 'Gender' },
        { field: 'status_nikah', title: 'Marital Status' },
        { field: 'alamat', title: 'Address' },
        { field: 'no_telp', title: 'No. Telp' },
        { field: 'status_aktif', title: 'Status', headerClass: 'justify-center' },
        { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
    ];
    items = [
        {
            id: 1,
            invoice: '081451',
            name: 'Laurie Fox',
            email: 'lauriefox@company.com',
            date: '15 Dec 2020',
            amount: '2275.45',
            status: 'Paid',
        },
        {
            id: 2,
            invoice: '081452',
            name: 'Alexander Gray',
            email: 'alexGray3188@gmail.com',
            date: '20 Dec 2020',
            amount: '1044.00',
            status: 'Paid',
        },
        {
            id: 3,
            invoice: '081681',
            name: 'James Taylor',
            email: 'jamestaylor468@gmail.com',
            date: '27 Dec 2020',
            amount: '20.00',
            status: 'Pending',
        },
        {
            id: 4,
            invoice: '082693',
            name: 'Grace Roberts',
            email: 'graceRoberts@company.com',
            date: '31 Dec 2020',
            amount: '344.00',
            status: 'Paid',
        },
        {
            id: 5,
            invoice: '084743',
            name: 'Donna Rogers',
            email: 'donnaRogers@hotmail.com',
            date: '03 Jan 2021',
            amount: '405.15',
            status: 'Paid',
        },
        {
            id: 6,
            invoice: '086643',
            name: 'Amy Diaz',
            email: 'amy968@gmail.com',
            date: '14 Jan 2020',
            amount: '100.00',
            status: 'Paid',
        },
        {
            id: 7,
            invoice: '086773',
            name: 'Nia Hillyer',
            email: 'niahillyer666@comapny.com',
            date: '20 Jan 2021',
            amount: '59.21',
            status: 'Pending',
        },
        {
            id: 8,
            invoice: '087916',
            name: 'Mary McDonald',
            email: 'maryDonald007@gamil.com',
            date: '25 Jan 2021',
            amount: '79.00',
            status: 'Pending',
        },
        {
            id: 9,
            invoice: '089472',
            name: 'Andy King',
            email: 'kingandy07@company.com',
            date: '28 Jan 2021',
            amount: '149.00',
            status: 'Paid',
        },
        {
            id: 10,
            invoice: '091768',
            name: 'Vincent Carpenter',
            email: 'vincentcarpenter@gmail.com',
            date: '30 Jan 2021',
            amount: '400',
            status: 'Paid',
        },
        {
            id: 11,
            invoice: '095841',
            name: 'Kelly Young',
            email: 'youngkelly@hotmail.com',
            date: '06 Feb 2021',
            amount: '49.00',
            status: 'Pending',
        },
        {
            id: 12,
            invoice: '098424',
            name: 'Alma Clarke',
            email: 'alma.clarke@gmail.com',
            date: '10 Feb 2021',
            amount: '234.40',
            status: 'Paid',
        },
    ];

    ngOnInit(): void {
        this.getMembers();
    }

    getMembers(): void {
        this.dataMasterService.getMembers().subscribe(
            (data) => {
                this.members = data;
                console.log(this.members);
            },
            (error) => {
                console.error('Error fetching members', error);
            }
        );
    }

    getPbn(): void {
        this.dataMasterService.getPbn().subscribe(
            (data) => {
                this.pbn = data;
                console.log(this.pbn);
            },
            (error) => {
                console.error('Error fetching pbn', error);
            }
        );
    }
    
    getRole(): void {
        this.dataMasterService.getRole().subscribe(
            (data) => {
                this.role = data;
                console.log(this.role);
            },
            (error) => {
                console.error('Error fetching role', error);
            }
        );
    }

    getRolePermission(): void {
        this.dataMasterService.getRolePermission().subscribe(
            (data) => {
                this.rolePermission = data;
                console.log(this.rolePermission);
            },
            (error) => {
                console.error('Error fetching rolePermission', error);
            }
        );
    }

    getStatus(): void {
        this.dataMasterService.getStatus().subscribe(
            (data) => {
                this.status = data;
                console.log(this.status);
            },
            (error) => {
                console.error('Error fetching status', error);
            }
        );
    }

    getUnit(): void {
        this.dataMasterService.getUnit().subscribe(
            (data) => {
                this.unit = data;
                console.log(this.unit);
            },
            (error) => {
                console.error('Error fetching unit', error);
            }
        );
    }

    getUsers(): void {
        this.dataMasterService.getUsers().subscribe(
            (data) => {
                this.users = data;
                console.log(this.users);
            },
            (error) => {
                console.error('Error fetching users', error);
            }
        );
    }

    getPendidikan(): void {
        this.dataMasterService.getPendidikan().subscribe(
            (data) => {
                this.pendidikan = data;
                console.log(this.pendidikan);
            },
            (error) => {
                console.error('Error fetching pendidikan', error);
            }
        );
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
                this.dataMasterService.deleteMember(id).subscribe(
                    () => {
                        swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
                        this.getMembers();
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

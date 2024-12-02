import { Component, ViewChild } from '@angular/core';
import { DataMasterService } from 'src/app/service/dataMaster.service';
import { OperationsService } from 'src/app/service/operations.service';
import Swal from 'sweetalert2';

@Component({
    moduleId: module.id,
    templateUrl: './list.html',
})
export class ClassListComponent {
    members: any[] = [];
    member: any = {};
    employees: any[] = [];
    employee: any = {};
    pbn: any[] = [];
    pendidikan: any[] = [];
    role: any[] = [];
    rolePermission: any[] = [];
    status: any[] = [];
    unit: any[] = [];
    users: any[] = [];
    classes: any[] = [];
    class: any = {};

    constructor(private dataMasterService: DataMasterService, private opertationsService: OperationsService) {}
    @ViewChild('datatable') datatable: any;
    search = '';
    cols = [
        { field: 'cafe', title: 'Cafe' },
        { field: 'wasis', title: 'WASIS' },
        { field: 'status', title: 'STATUS' },
        { field: 'metode', title: 'Metode'},
        { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
    ];

    ngOnInit(): void {
        this.getClass();
        this.getMembers()
        this.getEmployees()
    }

    getClass(): void {
        this.opertationsService.getClass().subscribe(
            (data) => {
                this.classes = data;
                console.log(this.classes);
            },
            (error) => {
                console.error('Error fetching classes', error);
            }
        );
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

    getEmployees(): void {
        this.dataMasterService.getEmployees().subscribe(
            (data) => {
                this.employees = data;
                console.log(this.employees);
            },
            (error) => {
                console.error('Error fetching employees', error);
            }
        );
    }

    getMemberNameById(id: number): string {
        const member = this.members.find(member => member.id === id);
        return member ? member.nama_panggilan : 'Unknown';
    }

    getEmployeeNameById(id: number): string {
        const employee = this.employees.find(employee => employee.id === id);
        return employee ? employee.nama_panggilan : 'Unknown';
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
                this.dataMasterService.deleteEmployee(id).subscribe(
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

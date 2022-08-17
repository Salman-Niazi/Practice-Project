import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'practice';
  displayedColumns: string[] = ['productName', 'categroy','date','freshness','price', 'comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

 constructor(private dialog:MatDialog ,private api:ApiService){

 }
  ngOnInit(): void {
    this.getAllProduct()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProduct(id:number){
    Swal.fire({
      title: 'Are you sure to Delete?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'})
      .then((result) => {
        if (result.value) {
          this.api.deleteProduct(id).subscribe(
            data => {
              Swal.fire(
                'Deleted!',
                'Product Deleted successfully.',
                'success'
              ).then( () => {
                this.getAllProduct();
              });
            }
          )
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      })  
}
  



openDialog() {
        this.dialog.open(DialogComponent, {
          width:'30%'
        }).afterClosed().subscribe(val=>{
          if(val=='save'){
            this.getAllProduct();
          }
        })
      }

      getAllProduct() {
        this.api.getProduct().subscribe({
         next:(res)=>{
              this.dataSource = new MatTableDataSource(res);
              this.dataSource.paginator=this.paginator;
              this.dataSource.sort=this.sort
         },
         error:(err)=>{
             alert("error while Fectching data")
         },
        })
     }

     editProduct(row:any){
      this.dialog.open(DialogComponent,{
        width:'30%',
        data:row
      }).afterClosed().subscribe(val=>{
        if(val=='update'){
          this.getAllProduct();
        }
      })
     }
}



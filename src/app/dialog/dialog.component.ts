import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { HasTabIndex } from '@angular/material/core';
import { from } from 'rxjs';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshnessList=["Brand New","Second Hand","Refurnished"]
  productForm !:FormGroup;
  actionBtn:string='Save';
  constructor(private formBuilder:FormBuilder,
    private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dailogRef:MatDialogRef<DialogComponent>,) { }

  

  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      productName:['',Validators.required],
      categroy:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      date:['',Validators.required],
      comment:['',Validators.required]
    })
    console.log(this.editData);
    if(this.editData){
      this.actionBtn='Update';
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['categroy'].setValue(this.editData.categroy);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      
    }
  }
  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        Swal.fire({
          title: 'Are you sure to Add Product?',
          text: 'This process is irreversible.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, go ahead.',
          cancelButtonText: 'No, let me think'
        })

        .then((result) => {
          if (result.value) {
            Swal.fire(
              'Product Added!',
              'Product Added successfully.',
              'success'
            )
            this.api.postProduct(this.productForm.value).subscribe(
              data => {
                this.productForm.reset;
                this.dailogRef.close('save')
              }
            )
          }
          else if (result.dismiss === Swal.DismissReason.cancel) {
          }
        })
       }
    }
    else{
      this.updateProduct();
    }
  }
  updateProduct(){
        Swal.fire({
          title: 'Are you sure to Update Product?',
          text: 'This process is irreversible.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, go ahead.',
          cancelButtonText: 'No, let me think'
        })

        .then((result) => {
          if (result.value) {
            Swal.fire(
              'Product updated!',
              'Product updated successfully.',
              'success'
            )
            this.api.putProduct(this.productForm.value,this.editData.id).subscribe(
              data => {
                this.productForm.reset;
                this.dailogRef.close('update')
              }
            )
          }
          else if (result.dismiss === Swal.DismissReason.cancel) {
          }
        })
       }
    }






  // updateProduct(){
  //   Swal.fire({
  //     title: 'Are you sure to Add Product?',
  //     text: 'This process is irreversible.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, go ahead.',
  //     cancelButtonText: 'No, let me think'
  //   })
  //   this.api.putProduct(this.productForm.value,this.editData.id)
  //   .subscribe({
  //     next:(res)=>{
  //       this.productForm.reset;
  //       this.dailogRef.close('update');
  //     },
  //     error:(err)=>{
  //       alert("Error while Updating product ")
  //     }
      
  //   })
  // }
 


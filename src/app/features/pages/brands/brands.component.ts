import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BrandsService } from '../../../core/services/brands/brands.service';

@Component({
  selector: 'app-brands',
  standalone:true,
  imports: [NgFor],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  productlist:any[]=[]
  constructor(private show:BrandsService ,private toster:ToastrService){}
  ngOnInit(): void {
 this.getProducts()
  }

  getProducts() {
    this.show.getAllbrands().subscribe({
      next:(res:any) => {
        this.productlist = res.data;
        console.log(this.productlist)
      },
      error: (err:any) => {
        console.error('Error fetching cart:', err);
      }
    });
  }



  showDetails(id: string) {
    this.show.getAllbrandsdetails(id).subscribe({
      next: (res) => {
        // Remove existing overlay if it exists
        let existingOverlay = document.getElementById('toast-overlay');
        if (existingOverlay) {
          existingOverlay.remove();
        }
  
        // Create overlay
        const overlay = document.createElement('div');
        overlay.classList.add('custom-overlay');
        overlay.setAttribute('id', 'toast-overlay');
        document.body.appendChild(overlay);
  
        // Show toast with new layout
        const toastRef = this.toster.success(
          `<div class="custom-toast">
            <div class="toast-header">
              <button class="close-x" id="close-toast" aria-label="Close">×</button>
            </div>
            <hr>
            <div class="toast-content">
              <div>
                <h2 class="brand-title">${res.data.name}</h2>
                <p class="brand-slug">${res.data.slug}</p>
              </div>
              <div>
                <img src="${res.data.image}" class="brand-logo" alt="${res.data.name}" />
              </div>
            </div>
            <hr>
            <div class="toast">
              <button class="close-button" id="close-toast-btn">Close</button>
            </div>
          </div>`,
          '',
          {
            enableHtml: true,
            disableTimeOut: true,
            closeButton: false,
            positionClass: 'toast-top-center' // Keep it at the top
          }
        );
  
        // Function to close both overlay and toaster
        const closeToastAndOverlay = () => {
          this.toster.clear(toastRef.toastId); // Remove toast
          document.getElementById('toast-overlay')?.remove(); // Remove overlay
        };
  
        // Attach event listener to overlay and close buttons
        document.getElementById('toast-overlay')?.addEventListener("click", closeToastAndOverlay);
        document.getElementById('close-toast')?.addEventListener("click", closeToastAndOverlay);
        document.getElementById('close-toast-btn')?.addEventListener("click", closeToastAndOverlay);
      }
    });
  }
  





}


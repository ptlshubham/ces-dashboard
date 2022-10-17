
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { WebNavbar } from '../models/web-navbar.model';
import { WebFooter } from '../models/web-footer.model';
import { WebSlider } from '../models/web-slider.model';
import { WebImageUpload } from '../models/web-image-upload';

@Injectable({
    providedIn: 'root'
})
export class WebBasicService {
    bookingTimeInterval: any = [];
    constructor(
        private httpClient: HttpClient
    ) {
    }

    saveWebNavbarList(admin: WebNavbar): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveWebNavbarURL, admin);
    }
    getWebNavList(): Observable<WebNavbar[]> {
        let data:any;
        return this.httpClient.post<any>(ApiService.getWebNavbarURL,data);
    }
    saveWebFooterList(admin: WebFooter): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveWebFooterURL, admin);
    }
    getWebFootList(): Observable<WebFooter[]> {
        let data:any;
        return this.httpClient.post<any>(ApiService.getWebFooterURL,data);
    }
    saveWebSliderList(admin: WebSlider): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveWebSliderURL, admin);
    }
    getWebSlideList(): Observable<WebSlider[]> {
        let data:any;
        return this.httpClient.post<any>(ApiService.getWebSliderURL,data);
    }
    uploadWebImage(img:any): Observable<any>{
        debugger
       return this.httpClient.post<any>(ApiService.saveWebSliderImageURL, img);
   
    }
    
    getWebImageList(admin: WebImageUpload): Observable<any> {
        return this.httpClient.post<any>(ApiService.getWebImageUploadURL,admin);
    }
    saveWebImageUpload(admin: WebImageUpload): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveWebImageUploadURL, admin);
    }
    
    // saveAppointmentList(admin: any): Observable<any> {
    //     return this.httpClient.post<any>(ApiService.saveAppointmentListURL, admin);
    // }
    // getAllAppointmentList(): Observable<Appointment[]> {
    //     return this.httpClient.get<any>(ApiService.getAllAppointmentURL);
    // }
    // getCompletedServices(): Observable<Appointment[]> {
    //     return this.httpClient.get<any>(ApiService.getAllCompletedServicesURL);
    // }
    // getViewAppointment(admin) {
    //     let data = {
    //         id: admin.id
    //     }
    //     return this.httpClient.post<any>(ApiService.getViewAppointmentURL, data);
    // }
    // getDailyTotalList(): Observable<Customer[]> {
    //     return this.httpClient.get<any>(ApiService.getDailyTotalURL);
    // }
    // getMonthlyTotalList(): Observable<Customer[]> {
    //     return this.httpClient.get<any>(ApiService.getMonthlyTotalURL);
    // }
    // updateCustomerList(admin: Customer): Observable<any> {
    //     return this.httpClient.post<any>(ApiService.updateCustomerListURL, admin);
    // }
    // removeCustomerDetails(id) {
    //     return this.httpClient.get<any>(ApiService.removeCustomerDetailsURL + id);
    // }
    // updateActiveStatusList(admin: Appointment): Observable<any> {
    //     return this.httpClient.post<any>(ApiService.updateActiveStatusURL, admin);
    // }
    // getCustAllPoint(id) {
    //     let data = {
    //         id: id
    //     }
    //     return this.httpClient.post<any>(ApiService.getCustomerTotalPointsURL, data);
    // }
    // getAllCustomerDataList(id) {
    //     let data = {
    //         id: id
    //     }
    //     return this.httpClient.post<any>(ApiService.getAllCustomerDataListURL, data);
    // }
    // getCustomerById(id) {
    //     let data = {
    //         id: id
    //     }
    //     return this.httpClient.post<any>(ApiService.getCustomerByIdURL, data);
    // }
    // getServicesListUsingId(id) {
    //     let data = {
    //         id: id
    //     }
    //     return this.httpClient.post<any>(ApiService.getUsedServicesByCustomerURL, data);
    // }
    // savePaymentDetails(admin: Payment) {
    //     return this.httpClient.post<any>(ApiService.saveModeOfPayment, admin);
    // }
    // getPaymentDetails(): Observable<Payment[]> {
    //     return this.httpClient.get<any>(ApiService.getAllModeOfPayment);
    // }
    // getMonthlyDetails(): Observable<Payment[]> {
    //     return this.httpClient.get<any>(ApiService.getMonthlyPayment);
    // }
    // getCustomerDataById(id) {
    //     let data = {
    //         id: id
    //     }
    //     return this.httpClient.post<any>(ApiService.getCustomerDataByIdURL, data);
    // }
    // emailVerify(admin: Customer): Observable<any> {
    //     return this.httpClient.post<any>(ApiService.verificationURL, admin);
    // }
    // getOtpforRegister(admin: Customer): Observable<any> {
    //     return this.httpClient.post<any>(ApiService.getRegisterOtpURL, admin);
    // }
    // saveUserCustomerList(admin: Customer): Observable<any> {
    //     return this.httpClient.post<any>(ApiService.saveUserCustomerListURL, admin);
    // }
    // savePurchasedOrder(data: any): Observable<any> {
    //     return this.httpClient.post<any>(ApiService.saveOfferPurchaseURL, data);
    // }
    // removeLastInsertedOTP(data) {

    //     return this.httpClient.post<any>(ApiService.removeLastInsertedOTPURL, data);
    // }
    // getActivatedMembershipDetail(data): Observable<any> {
    //     return this.httpClient.post<any>(ApiService.getActivatedMembershipURL, data);
    // }
    // saveRatingsDetailsById(data): Observable<any> {
    //     return this.httpClient.post<any>(ApiService.saveRatingsDetailsURL, data);
    // }
    // getBookingTimeInterval(): Observable<any> {
    //     return this.httpClient.get("./assets/json/Time-Interval.json");

    // }
}

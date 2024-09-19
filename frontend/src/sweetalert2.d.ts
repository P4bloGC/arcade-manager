// sweetalert2.d.ts
declare module 'sweetalert2' {
    import { SweetAlertResult } from 'sweetalert2';
    const Swal: {
      fire: (options: any) => Promise<SweetAlertResult<any>>;
    };
    export default Swal;
  }
  
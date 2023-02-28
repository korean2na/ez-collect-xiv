import { Alert } from 'bootstrap';

export default function CreateAlert(message, type) {
    const alertBar = document.getElementById('liveAlertBar')
    const wrapper = document.createElement('div')

    wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
    ].join('')

    alertBar.append(wrapper)
    
    var bsAlert = Alert.getOrCreateInstance('.alert')
    
    setTimeout(() => {
      bsAlert.close()
    }, 5000);
}
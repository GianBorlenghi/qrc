
const contenedorQR = document.getElementById('contenedorQR');
const formulario = document.getElementById('formulario');
const formulario_wsp = document.getElementById('formulario_whatsapp');
const a = document.getElementById('nav');
const elem = document.getElementsByClassName('nav-link');
const forms = document.getElementsByClassName('formulario');
const QR = new QRCode(contenedorQR);
var googleMapsUrl = "";
QRCode.CorrectLevel.L

var act = "url";



var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);
var vcard = {
    str_start: 'BEGIN:VCARD\nVERSION:3.0\n',
    str_vcard: 'BEGIN:VCARD\nVERSION:3.0\n',
    str_end: '\nEND:VCARD',
    goog_chart: 'http://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=',
    form: [],
    get_field: function (field) {
        for (var i in vcard.form) {
            if (vcard.form[i].name === field) {
                return vcard.form[i].value.replace(/^\s+|\s+$/g, "");
            }
        }
    },
    add_you: function () {
        var first_name = vcard.get_field("first_name"),
            last_name = vcard.get_field("last_name"),
            birthday = vcard.get_field('birthday'),
            gender = vcard.get_field('gender');

        vcard.str_vcard += 'N:' + last_name + ';' + first_name + '\n' +
            'FN:' + first_name + ' ' + last_name;
        // TODO convert date to american format
        if (birthday !== '') { vcard.str_vcard += '\nBDAY:' + birthday; }

        if (gender !== '') { vcard.str_vcard += '\nX-GENDER:' + gender; }
    },
    add_address: function () {
        var home_street = vcard.get_field("home_street"),
            home_city = vcard.get_field("home_city"),
            home_region = vcard.get_field("home_region"),
            home_post = vcard.get_field("home_post"),
            home_country = vcard.get_field("home_country"),
            org_street = vcard.get_field("org_street"),
            org_city = vcard.get_field("org_city"),
            org_region = vcard.get_field("org_region"),
            org_post = vcard.get_field("org_post"),
            org_country = vcard.get_field("org_country");

        if (home_street + home_city + home_region + home_post + home_country !== '') {
            vcard.str_vcard += '\nADR;TYPE=Personal:;;' + home_street + ';' + home_city + ';' + home_region +
                ';' + home_post + ';' + home_country;
        }
        if (org_street + org_city + org_region + org_post + org_country !== '') {
            vcard.str_vcard += '\nADR;TYPE=Trabajo:;;' + org_street + ';' + org_city + ';' + org_region +
                ';' + org_post + ';' + org_country;
        }
    },
    add_tel: function () {
        var home = vcard.get_field("home_tel"),
            work = vcard.get_field("org_tel");

        if (home !== '') { vcard.str_vcard += '\nTEL;TYPE=Personal:' + home; }

        if (work !== '') { vcard.str_vcard += '\nTEL;TYPE=Trabajo:' + work; }
    },
    add_email: function () {
        var home = vcard.get_field("home_email"),
            work = vcard.get_field("org_email");

        if (home !== '') { vcard.str_vcard += '\nEMAIL;TYPE=Personal:' + home; }

        if (work !== '') { vcard.str_vcard += '\nEMAIL;TYPE=Trabajok:' + work; }
    },
    add_url: function () {
        var home = vcard.get_field("home_url"),
            work = vcard.get_field("org_url");

        if (home !== '') { vcard.str_vcard += '\nURL;TYPE=home:' + home; }

        if (work !== '') { vcard.str_vcard += '\nURL;TYPE=work:' + work; }
    },
    add_work: function () {
        var name = vcard.get_field("org_name"),
            title = vcard.get_field("org_title");

        if (name !== '') { vcard.str_vcard += '\nORG:' + name; }

        if (title !== '') { vcard.str_vcard += '\nTITLE:' + title; }
    },

    required_check: function () {
        var first_name = vcard.get_field("first_name"),
            last_name = vcard.get_field("last_name"),
            msg = 'Field%FIELD% %NAME% %VERB% required.',
            fields = [];

        if (first_name === '') { fields.push('First name'); }

        if (last_name === '') { fields.push('Last name'); }

        if (fields.length === 0) { return ''; }

        msg = msg.replace('%NAME%', fields.join(', '));

        msg = msg.replace('%FIELD%', (fields.length === 1) ? '' : 's');

        msg = msg.replace('%VERB%', (fields.length === 1) ? 'is' : 'are');

        return msg;
    },
    save: function () {
        vcard.form = $('form').serializeArray();

        var required_check_output = vcard.required_check();

        if (required_check_output !== '') {
            alert(required_check_output);
            return;
        }

        vcard.add_you();

        vcard.add_address();

        vcard.add_tel();

        vcard.add_email();

        vcard.add_url();

        vcard.add_work();

        //vcard.add_social();

        vcard.str_vcard += vcard.str_end;

        $('textarea[name="vcard"]').val(vcard.str_vcard);
        QR.makeCode(vcard.str_vcard)
        $('#qr').attr('src', vcard.goog_chart + vcard.str_vcard.replace(/\n/g, '%0A'));

        vcard.str_vcard = vcard.str_start;


    }
};

$(function () {
    $('input[name="submit"]').click(vcard.save);
});



formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    QR.makeCode(formulario.link.value);
    document.getElementById("download").classList.remove("hide")

});

formulario_ubi.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById("download").classList.remove("hide")

});
/*document.getElementById("download").addEventListener('click', (e) => {
  

    e.preventDefault();
//var source = document.getElementById("contenedorQR").children[1].src;
var source = document.querySelector("#contenedorQR img").src;
document.getElementById("respuesta").innerHTML = source
// Verificar que el src realmente apunta a una imagen
if (source.startsWith("data:image") || /\.(jpg|jpeg|png|gif)$/.test(source)) {
    fetch(source)
        .then(res => res.blob())
        .then(blob => {
            // Crear un enlace de descarga
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(blob);
            a.href = source;
            // Forzar la extensión correcta
            var extension = blob.type.split('/')[1];
            let nombreArchivo = prompt("Ingrese el nombre del archivo a guardar")
            if(nombreArchivo.length== 0){
                nombreArchivo = "QR"
            }
            var filename = nombreArchivo+'.' + extension;
            a.download = filename; // Nombre del archivo con la extensión correcta
            document.body.appendChild(a);
            a.click();

            // Limpiar
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch(err => console.error('Error al descargar la imagen: ', err));
} else {
    console.error('El source no apunta a una imagen válida.');
}
});*/





formulario_whatsapp.addEventListener('submit', (e) => {
    e.preventDefault();
    const txt = formulario_wsp.texto.value

    QR.makeCode("https://wa.me/" + formulario_wsp.celular.value + "/?text=" + txt.split(" ").join("%20")) + "%20";
    document.getElementById("download").classList.remove("hide")

});
formulario_ubi.addEventListener('submit', (e) => {
    e.preventDefault();
    QR.makeCode(googleMapsUrl)
    document.getElementById("download").classList.remove("hide")

});

formulario_geo.addEventListener('submit', (e) => {
    e.preventDefault();
   // document.getElementById("download").classList.remove("hide")
    console.log("Ho")
    QR.makeCode(vcard.form);
    //document.getElementById("download").classList.remove("hide")
});

formulario_mail.addEventListener('submit', (e) => {
    e.preventDefault();
    const asunto = formulario_mail.asunto.value;
    const cuerpo = formulario_mail.texto.value
    QR.makeCode("mailto:" + formulario_mail.mail.value + "?subject=" + asunto.split(" ").join("%20") + "&body=" + cuerpo.split(" ").join("%20"));
    console.log(QR)
    document.getElementById("download").classList.remove("hide")
});


a.addEventListener('click', (e) => {
    e.preventDefault();
    const tg = e.target;

    for (let i = 0; i < elem.length; i++) {
        elem[i].classList.remove('active');
    }
    tg.classList.add("active")
    const active = document.getElementsByClassName('active')[0].getAttribute('id')
    this.act = active;
    switch (active) {
        case 'wsp':
            const form_wsp = document.getElementById('formulario_whatsapp');
            for (let i = 0; i < forms.length; i++) {
                forms[i].classList.add('hide');
            }
            form_wsp.classList.remove('hide');
            document.getElementById("btn2").classList.remove("hide");
            document.getElementById("uploadButton").classList.add("hide");
            $("#download").addClass("hide");

            collapse()
            break;
        case 'url':

            for (let i = 0; i < forms.length; i++) {
                forms[i].classList.add('hide');
            }
            document.getElementById('formulario').classList.remove('hide');
            document.getElementById("btn2").classList.remove("hide");
            document.getElementById("uploadButton").classList.add("hide");
            $("#download").addClass("hide");

            collapse()
            break;

        case 'geo':
            for (let i = 0; i < forms.length; i++) {
                forms[i].classList.add('hide');
            }
            document.getElementById('formulario_geo').classList.remove('hide');
            document.getElementById("btn2").classList.add("hide");
            document.getElementById("uploadButton").classList.add("hide");
            $("#download").removeClass("hide");

            collapse()

            break;

        case 'archivo':

            for (let i = 0; i < forms.length; i++) {
                forms[i].classList.add('hide');
            }
            document.getElementById('formulario_archivo').classList.remove('hide');
            document.getElementById("btn2").classList.add("hide");
            document.getElementById("uploadButton").classList.remove("hide");
            $("#download").addClass("hide");

            collapse()

            break;
        case 'mail':

            for (let i = 0; i < forms.length; i++) {
                forms[i].classList.add('hide');
            }
            document.getElementById('formulario_mail').classList.remove('hide');
            document.getElementById("btn2").classList.add("hide");
            document.getElementById("uploadButton").classList.add("hide");
            $("#download").addClass("hide");

            collapse()
            break;

            case 'ubi':

            for (let i = 0; i < forms.length; i++) {
                forms[i].classList.add('hide');
            }
            document.getElementById('formulario_ubi').classList.remove('hide');
            document.getElementById("btn2").classList.add("hide");
            document.getElementById("uploadButton").classList.add("hide");
            $("#download").addClass("hide");

            collapse()
            break;




        default:
            break;
    }
})
function collapse() {
    $("#botonExpand").attr("aria-expanded", "false")
    $("#botonExpand").addClass("collapsed")
    $("#navbarNavDropdown").removeClass("show")
}

document.getElementById("download").addEventListener('click', (e) => {
    e.preventDefault();

    var img = document.getElementById("contenedorQR").children[1];
    var source = img.src;

    // Verificar si es una imagen válida
    if (source.startsWith("data:image") || /\.(jpg|jpeg|png|gif)$/.test(source)) {
        fetch(source)
            .then(res => res.blob())
            .then(blob => {
                let nombreArchivo = prompt("Ingrese el nombre del archivo a guardar");
                if (nombreArchivo.length == 0) {
                    nombreArchivo = "QR";
                }
                var extension = blob.type.split('/')[1];
                var filename = nombreArchivo + '.' + extension;

                // Utilizar FileSaver.js para descargar el archivo
                saveAs(blob, filename);
            })
            .catch(err => console.error('Error al descargar la imagen: ', err));
    } else {
        console.error('El source no apunta a una imagen válida.');
    }
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("La geolocalización no es soportada por este navegador.");
    }
}

// Función para mostrar la ubicación y generar el QR
function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    googleMapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
    
    // Mostrar el enlace de Google Maps
    const mapLink = document.getElementById("mapLink");
    mapLink.innerHTML = `<a href="${googleMapsUrl}" target="_blank">Ver ubicación en Google Maps</a>`;
   
}
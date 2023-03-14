$(document).ready(function () {
    var otoceni = 0;
    var bodySpravne = 0;
    var bodySpatne = 0;
    var barvaKartyZadni = '#008CBA';
    var barvaKartyPredni = '#4CAF50';
    var barvaKartyOtocene = '#f97196';
    var cisla = [];
    var pocetSloupcuKaret = 4
    var pocetRadkuKaret = 4

    zobrazKarty();

    $('select[name=sloupce]').change(function () {
        pocetSloupcuKaret = $(this).val();
        zobrazKarty();
    });

    $('select[name=radky').change(function () {
        pocetRadkuKaret = $(this).val();
        zobrazKarty();
    });

    function otoc() {
        if ($(this).data('otoceno') !== 2) {
            otoceni++;
            if (otoceni == 1) {
                prvniKarta = $(this);
                prvniKarta.text(prvniKarta.val());
                prvniKarta.data('otoceno', 1);
                prvniKarta.css('background-color', barvaKartyOtocene);
            }
            if (otoceni == 2) {
                if ($(this).data('otoceno') !== 1) {
                    druhaKarta = $(this);
                    druhaKarta.text(druhaKarta.val());
                    druhaKarta.css('background-color', barvaKartyOtocene);
                    if (prvniKarta.val() == druhaKarta.val()) {
                        $('button').off('click');
                        setTimeout(function () {
                            prvniKarta.css('background-color', barvaKartyPredni);
                            druhaKarta.css('background-color', barvaKartyPredni);
                            prvniKarta.data('otoceno', 2); // 2 = hotovo dvojice vybrana
                            druhaKarta.data('otoceno', 2);
                            bodySpravne++;
                            hodnoceni();
                            $('button').on('click', otoc);
                        }, 800);
                    } else {
                        $('button').off('click');
                        setTimeout(function () {
                            prvniKarta.text('x');
                            druhaKarta.text('x');
                            prvniKarta.css('background-color', barvaKartyZadni);
                            druhaKarta.css('background-color', barvaKartyZadni);
                            bodySpatne++;
                            hodnoceni();
                            $('button').on('click', otoc);
                        }, 800);
                    }

                } else {
                    bodySpatne++;
                    prvniKarta.text('x');
                    prvniKarta.css('background-color', barvaKartyZadni);
                }

                if ($(this).data('otoceno') !== 2) {
                    prvniKarta.data('otoceno', 0);
                }
                otoceni = 0;
            }
        }
    };

    function hodnoceni() {
        $('#body_spravne').text(bodySpravne);
        $('#body_spatne').text(bodySpatne);
        bodyUspesnost = ((bodySpravne / (bodySpatne + bodySpravne)) * 100).toFixed(1);
        $('#body_uspesnost').text(bodyUspesnost + '%');
    }

    function zobrazKarty() {
        bodySpravne = 0;
        bodySpatne = 0;
        $('#body_spravne').text(bodySpravne);
        $('#body_spatne').text(bodySpatne);
        $('#body_uspesnost').text('0.0%');
        cisla.length = 0;

        // vygenerujeme pole čísel (po dvojici 11, 22, 33 atd.)
        for (x = 0; x < (pocetSloupcuKaret * pocetRadkuKaret) / 2; x++) {
            cisla.push(x);
            cisla.push(x);
        }
        cisla.sort(function (a, b) { return 0.5 - Math.random() }); // náhodně setřídíme

        // zobraníme karty
        radek = 0;
        karty = '';
        for (x = 0; x <= (pocetSloupcuKaret * pocetRadkuKaret) - 1; x++) {
            karty += '<button value="' + cisla[x] + '">x</button>';
            radek++;
            if (radek == pocetSloupcuKaret) {
                karty += '<br>';
                radek = 0;
            }
        }
        $('#hraci_plocha').html(karty);
        $('button').click(otoc);
    }
});
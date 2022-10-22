let gradi_fi_a = document.getElementById("gradi_fi_a"),
    primi_fi_a = document.getElementById("primi_fi_a"),
    secondi_fi_a = document.getElementById("secondi_fi_a"),
    cardine_fi_a = document.getElementById("cardine_fi_a"),
    gradi_fi_b = document.getElementById("gradi_fi_b"),
    primi_fi_b = document.getElementById("primi_fi_b"),
    secondi_fi_b = document.getElementById("secondi_fi_b"),
    cardine_fi_b = document.getElementById("cardine_fi_b"),
    gradi_lambda_a = document.getElementById("gradi_lambda_a"),
    primi_lambda_a = document.getElementById("primi_lambda_a"),
    secondi_lambda_a = document.getElementById("secondi_lambda_a"),
    cardine_lambda_a = document.getElementById("cardine_lambda_a"),
    gradi_lambda_b = document.getElementById("gradi_lambda_b"),
    primi_lambda_b = document.getElementById("primi_lambda_b"),
    secondi_lambda_b = document.getElementById("secondi_lambda_b"),
    cardine_lambda_b = document.getElementById("cardine_lambda_b"),
    btn = document.getElementById("btn"),
    result = document.getElementById("result"),
    input_section = document.getElementById("input_group"),
    etd = document.getElementById("etd"),
    vel = document.getElementById("vel"),
    usa_secondi = !0,
    usa_fuso_orario = !0,
    lambda_fuso_a,
    lambda_fuso_b,
    date,
    etd_tm,
    delta_t,
    eta_tm,
    eta,
    giorni,
    ore,
    minuti,
    m,
    rv,
    Rv,
    tan_rv,
    delta_fi_c,
    lat_fi_a,
    lat_fi_b,
    cardine_delta_lambda,
    cardine_delta_fi,
    fi_a_gradi,
    fi_b_gradi,
    lambda_a_gradi,
    lambda_b_gradi,
    delta_fi,
    delta_lambda,
    delta_lambda_primi,
    delta_fi_primi;
function calculate(e, f, g, h, i, j, k, l, a, b, c, d, n, o, p, q, r, s) {
    if (
        ("" == e && (e = 0),
        "" == f && (f = 0),
        "" == g && (g = 0),
        "" == h && (h = 0),
        "" == i && (i = 0),
        "" == j && (j = 0),
        "" == k && (k = 0),
        "" == l && (l = 0),
        "" == a && (a = 0),
        "" == b && (b = 0),
        "" == c && (c = 0),
        "" == d && (d = 0),
        0 == a && 0 == c && 0 == b && 0 == d && (usa_secondi = !1),
        (fi_a_gradi = toGradi(e, i, a, n)),
        (fi_b_gradi = toGradi(f, j, b, o)),
        (lambda_a_gradi = toGradi(g, k, c, p)),
        (lambda_b_gradi = toGradi(h, l, d, q)),
        (delta_fi = fi_b_gradi - fi_a_gradi),
        (delta_lambda = lambda_b_gradi - lambda_a_gradi),
        (delta_lambda_primi = 60 * delta_lambda),
        (delta_fi_primi = 60 * delta_fi),
        (cardine_delta_fi = delta_fi < 0 ? "S" : "N"),
        (cardine_delta_lambda = delta_lambda < 0 ? "W" : "E"),
        (delta_fi = toPrimi(delta_fi, "f")),
        (delta_lambda = toPrimi(delta_lambda, "l")),
        (lat_fi_a = (10800 / Math.PI) * Math.log(Math.tan(((45 + Number(fi_a_gradi / 2)) * Math.PI) / 180))),
        (lat_fi_b = (10800 / Math.PI) * Math.log(Math.tan(((45 + Number(fi_b_gradi / 2)) * Math.PI) / 180))),
        (delta_fi_c = Math.abs(lat_fi_a - lat_fi_b)),
        (tan_rv = Number(delta_lambda_primi / delta_fi_c)),
        ("S" == cardine_delta_fi || delta_lambda_primi < 0) && (tan_rv *= -1),
        (rv = (180 * Math.abs(Math.atan(tan_rv))) / Math.PI),
        "N" == cardine_delta_fi && "E" == cardine_delta_lambda
            ? (Rv = Number(rv).toFixed(2))
            : "S" == cardine_delta_fi && "E" == cardine_delta_lambda
            ? (Rv = Number(180 - rv).toFixed(2))
            : "S" == cardine_delta_fi && "W" == cardine_delta_lambda
            ? (Rv = Number(180 + Number(rv)).toFixed(2))
            : "N" == cardine_delta_fi && "W" == cardine_delta_lambda && (Rv = Number(360 - rv).toFixed(2)),
        (m = Math.abs(delta_fi_primi / Math.cos((rv * Math.PI) / 180)).toFixed(2)),
        !0 == usa_fuso_orario)
    ) {
        for (
            lambda_fuso_a = Number(Math.round((lambda_a_gradi / 15).toFixed(1))),
                lambda_fuso_b = Number(Math.round((lambda_b_gradi / 15).toFixed(1))),
                date = new Date(r),
                date.setHours(date.getHours() - lambda_fuso_a),
                etd_tm = date.toLocaleString().replace(",", ""),
                delta_t = m / s,
                giorni = 0;
            delta_t - 24 >= 0;

        )
            giorni++, (delta_t -= 24);
        (ore = parseInt(delta_t)),
            (minuti = Math.round((60 * Number("0." + ("" + delta_t).split(".")[1])).toFixed(1))),
            (delta_t = giorni + "g " + ore + "h " + minuti + "m"),
            date.setDate(date.getDate() + giorni),
            date.setMinutes(date.getMinutes() + minuti),
            date.setHours(date.getHours() + ore),
            (eta_tm = date.toLocaleString().replace(",", "")),
            date.setHours(date.getHours() + lambda_fuso_b),
            (eta = date.toLocaleString().replace(",", ""));
    }
    (result.innerHTML = "<div class='title'><i class='fa-solid fa-ship'></i><p class='h1'>Navify</p><p class='sub'>Risultati</p></div>"),
        (result.innerHTML +=
            "<div class='res-con'><p>Differenza di latitudine tra il punto di arrivo (B) e il punto di partenza (A) </p><p><i class='fa-solid fa-arrow-right-long'></i><b>\u0394\u03C6</b> = <i>\u03C6B - \u03C6A</i> = <b>" +
            delta_fi +
            "</b></p></div>"),
        (result.innerHTML +=
            "<div class='res-con'><p>Differenza di longitudine tra il punto di arrivo (B) e il punto di partenza (A) </p><i class='fa-solid fa-arrow-right-long'></i><p><b>\u0394\u03BB</b> = <i>\u03BBB - \u03BBA</i> = <b>" +
            delta_lambda +
            "</b></p></div>"),
        (result.innerHTML +=
            "<div class='res-con'><p>Latitudine crescente del punto di partenza (A) </p><p><i class='fa-solid fa-arrow-right-long'></i><b>\u03C6cA</b> = <i>(10800/\u03C0)ln tan(45\xb0+(\u03C6A/2))</i> = <b>" +
            lat_fi_a +
            " " +
            n +
            "</b></p></div>"),
        (result.innerHTML +=
            "<div class='res-con'><p>Latitudine crescente del punto di arrivo (B) </p><p><i class='fa-solid fa-arrow-right-long'></i><b>\u03C6cB</b> = <i>(10800/\u03C0)ln tan(45\xb0+(\u03C6B/2))</i> = <b>" +
            lat_fi_b +
            " " +
            o +
            "</b></p></div>"),
        (result.innerHTML +=
            "<div class='res-con'><p>Differenza tra la latitudine crescente di A e la latitudine crescente di B </p><p><i class='fa-solid fa-arrow-right-long'></i><b>\u0394\u03C6cB</b> = <i>\u03C6cA - \u03C6cB</i> = <b>" +
            delta_fi_c +
            "' " +
            cardine_delta_fi +
            "</b></p></div>"),
        (result.innerHTML += "<div class='res-con'><p>Tangente della rotta quadrantale </p><p><i class='fa-solid fa-arrow-right-long'></i><b>tan rv</b> = <i>\u0394\u03BB\u2019/\u0394\u03C6c</i> = <b>" + tan_rv + "</b></p></div>"),
        (result.innerHTML +=
            "<div class='res-con'><p>Rotta quadrantale </p><p><i class='fa-solid fa-arrow-right-long'></i><b>rv</b> = <i>tan-1 tan rv</i> = <b>" + cardine_delta_fi + " " + rv + "\xb0 " + cardine_delta_lambda + "</b></p></div>"),
        (result.innerHTML += "<div class='res-con'><p>Rotta vera </p><p><i class='fa-solid fa-arrow-right-long'></i><b>Rv</b> = <b>" + Rv + "\xb0</b></p></div>"),
        (result.innerHTML += "<div class='res-con'><p>Cammino </p><p><i class='fa-solid fa-arrow-right-long'></i><b>m</b> = <i>\u0394\u03C6\u2019/cos rv</i> = <b>" + m + " Nm</b></p></div>"),
        !0 == usa_fuso_orario &&
            ((result.innerHTML += "<div class='res-con'><p>Lambda fuso del punto di partenza (A) </p><p><i class='fa-solid fa-arrow-right-long'></i><b>\u03BBfA</b> = <i>\u03BBA/15\xb0</i> = <b>" + lambda_fuso_a + "</b></p></div>"),
            (result.innerHTML += "<div class='res-con'><p>Orario locale convertito in orario di Greenwich </p><p><i class='fa-solid fa-arrow-right-long'></i><b>ETD TM</b> = <i>ETD - \u03BBfA</i> = <b>" + etd_tm + "</b></p></div>"),
            (result.innerHTML += "<div class='res-con'><p>Quantit\xe0 di tempo </p><p><i class='fa-solid fa-arrow-right-long'></i><b>\u0394t</b> = <i>m/v</i> = <b>" + delta_t + "</b></p></div>"),
            (result.innerHTML += "<div class='res-con'><p>Orario di arrivo rispetto a Greenwich </p><p><i class='fa-solid fa-arrow-right-long'></i><b>ETA TM</b> = <i>ETD TM + \u0394t</i> = <b>" + eta_tm + "</b></p></div>"),
            (result.innerHTML += "<div class='res-con'><p>Lambda fuso del punto di arrivo (B) </p><p><i class='fa-solid fa-arrow-right-long'></i><b>\u03BBfB</b> = <i>\u03BBB/15\xb0</i> = <b>" + lambda_fuso_b + " h (ore)</b></p></div>"),
            (result.innerHTML += "<div class='res-con'><p>Orario di arrivo locale </p><p><i class='fa-solid fa-arrow-right-long'></i><b>ETA</b> = <i>ETA TM + \u03BBfB</i> = <b>" + eta + "</b></p></div>")),
        (result.innerHTML += "<div class='btn-res'><button type='button' id='back' class='btn shadow-none'><i class='fa-solid fa-calculator'></i>  Torna al calcolatore</button></div>"),
        document.getElementById("back").addEventListener("click", () => {
            (result.innerHTML = ""), result.classList.add("hide"), input_section.classList.remove("hide");
        });
}
function clearResult() {
    result.innerHTML = "";
}
function clearInput() {
    (gradi_fi_a.value = ""),
        (gradi_fi_b.value = ""),
        (gradi_lambda_a.value = ""),
        (gradi_lambda_b.value = ""),
        (primi_fi_a.value = ""),
        (primi_fi_b.value = ""),
        (primi_lambda_a.value = ""),
        (primi_lambda_b.value = ""),
        (secondi_fi_a.value = ""),
        (secondi_fi_b.value = ""),
        (secondi_lambda_a.value = ""),
        (secondi_lambda_b.value = ""),
        (cardine_fi_a.value = "none"),
        (cardine_fi_b.value = "none"),
        (cardine_lambda_a.value = "none"),
        (cardine_lambda_b.value = "none"),
        (etd.value = ""),
        (vel.value = "");
}
function toGradi(c, d, e, a) {
    let b = Number(c) + Number(d) / 60 + Number(e) / 3600;
    return "S" == a || "W" == a ? -1 * b : b;
}
function toPrimi(g, e) {
    let f = "" + g,
        a = f.split(".")[0],
        c = "" + 60 * Number("0." + f.split(".")[1]),
        d = Math.round(c.split(".")[0]),
        h = Math.round(60 * Number("0." + c.split(".")[1]));
    for (; d >= 60; ) (d -= 60), a++;
    let b = "";
    return ("f" == e ? (b = a < 0 ? "S" : "N") : "l" == e && (b = a < 0 ? "W" : "E"), usa_secondi) ? Math.abs(a) + "\xb0 " + d + "' " + h + "'' " + b : Math.abs(a) + "\xb0 " + Number(Number(c).toFixed(2)) + "' " + b;
}
btn.addEventListener("click", () => {
    "none" == cardine_fi_a.value ||
    "none" == cardine_fi_b.value ||
    "none" == cardine_lambda_a.value ||
    "none" == cardine_lambda_b.value ||
    ("" == primi_fi_a.value &&
    "" == primi_fi_b.value &&
    "" == primi_lambda_a.value &&
    "" == primi_lambda_b.value) ||
    (0 == primi_fi_a.value &&
    0 == primi_fi_b.value &&
    0 == primi_lambda_a.value &&
    0 == primi_lambda_b.value) ||
    gradi_fi_a.value.includes("-") ||
    primi_fi_a.value.includes("-") ||
    secondi_fi_a.value.includes("-") ||
    gradi_fi_b.value.includes("-") ||
    primi_fi_b.value.includes("-") ||
    secondi_fi_b.value.includes("-") ||
    gradi_lambda_a.value.includes("-") ||
    primi_lambda_a.value.includes("-") ||
    secondi_lambda_a.value.includes("-") ||
    gradi_lambda_b.value.includes("-") ||
    primi_lambda_b.value.includes("-") ||
    secondi_lambda_b.value.includes("-") ||
    vel.value.includes("-")
        ? (alert("Valori non validi, riprovare."), clearInput())
        : ((usa_fuso_orario = !!etd.value && !!vel.value),
          input_section.classList.add("hide"),
          result.classList.remove("hide"),
          calculate(
              gradi_fi_a.value,
              gradi_fi_b.value,
              gradi_lambda_a.value,
              gradi_lambda_b.value,
              primi_fi_a.value,
              primi_fi_b.value,
              primi_lambda_a.value,
              primi_lambda_b.value,
              secondi_fi_a.value,
              secondi_fi_b.value,
              secondi_lambda_a.value,
              secondi_lambda_b.value,
              cardine_fi_a.value,
              cardine_fi_b.value,
              cardine_lambda_a.value,
              cardine_lambda_b.value,
              etd.value,
              vel.value
          ),
          clearInput());
});
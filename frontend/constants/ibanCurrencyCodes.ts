const ibanCurrencyCodes = [
    { country: "AF", label: "AFN", value: "AFN "},
    { country: "DZ", label: "DZD", value: "DZD "},
    { country: "AR", label: "ARS", value: "ARS "},
    { country: "AM", label: "AMD", value: "AMD "},
    { country: "AW", label: "AWG", value: "AWG "},
    { country: "AU", label: "AUD", value: "AUD "},
    { country: "AZ", label: "AZN", value: "AZN "},
    { country: "BS", label: "BSD", value: "BSD "},
    { country: "BH", label: "BHD", value: "BHD "},
    { country: "TH", label: "THB", value: "THB" },
    { country: "PA", label: "PAB", value: "PAB" },
    { country: "BB", label: "BBD", value: "BBD" },
    { country: "BY", label: "BYN", value: "BYN" },
    { country: "BZ", label: "BZD", value: "BZD" },
    { country: "BM", label: "BMD", value: "BMD" },
    { country: "VE", label: "VEF", value: "VEF" },
    { country: "BO", label: "BOB", value: "BOB" },
    { country: "BR", label: "BRL", value: "BRL" },
    { country: "BN", label: "BND", value: "BND" },
    { country: "BG", label: "BGN", value: "BGN" },
    { country: "BI", label: "BIF", value: "BIF" },
    { country: "CV", label: "CVE", value: "CVE" },
    { country: "CA", label: "CAD", value: "CAD" },
    { country: "KY", label: "KYD", value: "KYD" },
    { country: "CL", label: "CLP", value: "CLP" },
    { country: "CO", label: "COP", value: "COP" },
    { country: "KM", label: "KMF", value: "KMF" },
    { country: "CD", label: "CDF", value: "CDF" },
    { country: "BA", label: "BAM", value: "BAM" },
    { country: "NI", label: "NIO", value: "NIO" },
    { country: "CR", label: "CRC", value: "CRC" },
    { country: "CZ", label: "CZK", value: "CZK" },
    { country: "GM", label: "GMD", value: "GMD" },
    { country: "DK", label: "DKK", value: "DKK" },
    { country: "MK", label: "MKD", value: "MKD" },
    { country: "DJ", label: "DJF", value: "DJF" },
    { country: "DO", label: "DOP", value: "DOP" },
    { country: "VN", label: "VND", value: "VND" },
    { country: "EG", label: "EGP", value: "EGP" },
    { country: "ET", label: "ETB", value: "ETB" },
    { country: "EU", label: "EUR", value: "EUR" },
    { country: "EE", label: "EEK", value: "EEK" },
    { country: "FK", label: "FKP", value: "FKP" },
    { country: "FJ", label: "FJD", value: "FJD" },
    { country: "HU", label: "HUF", value: "HUF" },
    { country: "GH", label: "GHS", value: "GHS" },
    { country: "GI", label: "GIP", value: "GIP" },
    { country: "HT", label: "HTG", value: "HTG" },
    { country: "PY", label: "PYG", value: "PYG" },
    { country: "GN", label: "GNF", value: "GNF" },
    { country: "GY", label: "GYD", value: "GYD" },
    { country: "HK", label: "HKD", value: "HKD" },
    { country: "UA", label: "UAH", value: "UAH" },
    { country: "IS", label: "ISK", value: "ISK" },
    { country: "IN", label: "INR", value: "INR" },
    { country: "IR", label: "IRR", value: "IRR" },
    { country: "IQ", label: "IQD", value: "IQD" },
    { country: "JM", label: "JMD", value: "JMD" },
    { country: "JO", label: "JOD", value: "JOD" },
    { country: "KE", label: "KES", value: "KES" },
    { country: "PG", label: "PGK", value: "PGK" },
    { country: "LA", label: "LAK", value: "LAK" },
    { country: "HR", label: "HRK", value: "HRK" },
    { country: "KW", label: "KWD", value: "KWD" },
    { country: "MW", label: "MWK", value: "MWK" },
    { country: "AO", label: "AOA", value: "AOA" },
    { country: "MM", label: "MMK", value: "MMK" },
    { country: "GE", label: "GEL", value: "GEL" },
    { country: "LV", label: "LVL", value: "LVL" },
    { country: "LB", label: "LBP", value: "LBP" },
    { country: "AL", label: "ALL", value: "ALL" },
    { country: "HN", label: "HNL", value: "HNL" },
    { country: "SL", label: "SLL", value: "SLL" },
    { country: "LR", label: "LRD", value: "LRD" },
    { country: "LY", label: "LYD", value: "LYD" },
    { country: "SZ", label: "SZL", value: "SZL" },
    { country: "LT", label: "LTL", value: "LTL" },
    { country: "LS", label: "LSL", value: "LSL" },
    { country: "MG", label: "MGA", value: "MGA" },
    { country: "MY", label: "MYR", value: "MYR" },
    { country: "MU", label: "MUR", value: "MUR" },
    { country: "MR", label: "MRO", value: "MRO" },
    { country: "MX", label: "MXN", value: "MXN" },
    { country: "MD", label: "MDL", value: "MDL" },
    { country: "MA", label: "MAD", value: "MAD" },
    { country: "MZ", label: "MZN", value: "MZN" },
    { country: "NG", label: "NGN", value: "NGN" },
    { country: "ER", label: "ERN", value: "ERN" },
    { country: "NA", label: "NAD", value: "NAD" },
    { country: "NP", label: "NPR", value: "NPR" },
    { country: "AN", label: "ANG", value: "ANG" },
    { country: "IL", label: "ILS", value: "ILS" },
    { country: "TW", label: "TWD", value: "TWD" },
    { country: "NZ", label: "NZD", value: "NZD" },
    { country: "BT", label: "BTN", value: "BTN" },
{country: "KP", label: "KPW", value: "KPW"}
     , 
{country: "NO", label: "NOK", value: "NOK"}
     , 
{country: "PE", label: "PEN", value: "PEN"}
     , 
{country: "PK", label: "PKR", value: "PKR"}
     , 
{country: "MO", label: "MOP", value: "MOP"}
     , 
{country: "TO", label: "TOP", value: "TOP"}
     , 
{country: "CU", label: "CUC", value: "CUC"}
     , 
{country: "UY", label: "UYU", value: "UYU"}
     , 
{country: "PH", label: "PHP", value: "PHP"}
     , 
{country: "GB", label: "GBP", value: "GBP"}
     , 
{country: "BW", label: "BWP", value: "BWP"}
     , 
{country: "QA", label: "QAR", value: "QAR"}
     , 
{country: "GT", label: "GTQ", value: "GTQ"}
     , 
{country: "ZA", label: "ZAR", value: "ZAR"}
     , 
{country: "OM", label: "OMR", value: "OMR"}
     , 
{country: "KH", label: "KHR", value: "KHR"}
     , 
{country: "RO", label: "RON", value: "RON"}
     , 
{country: "MV", label: "MVR", value: "MVR"}
     , 
{country: "ID", label: "IDR", value: "IDR"}
     , 
{country: "RU", label: "RUB", value: "RUB"}
     , 
{country: "RW", label: "RWF", value: "RWF"}
     , 
{country: "SH", label: "SHP", value: "SHP"}
     , 
{country: "ST", label: "STD", value: "STD"}
     , 
{country: "SA", label: "SAR", value: "SAR"}
     , 
{country: "RS", label: "RSD", value: "RSD"}
     , 
{country: "SC", label: "SCR", value: "SCR"}
     , 
{country: "SG", label: "SGD", value: "SGD"}
     , 
{country: "SB", label: "SBD", value: "SBD"}
     , 
{country: "KG", label: "KGS", value: "KGS"}
     , 
{country: "SO", label: "SOS", value: "SOS"}
     , 
{country: "TJ", label: "TJS", value: "TJS"}
     , 
{country: "SS", label: "SSP", value: "SSP"}
     , 
{country: "LK", label: "LKR", value: "LKR"}
     , 
{country: "SD", label: "SDG", value: "SDG"}
     , 
{country: "SR", label: "SRD", value: "SRD"}
     , 
{country: "SE", label: "SEK", value: "SEK"}
     , 
{country: "CH", label: "CHF", value: "CHF"}
     , 
{country: "SY", label: "SYP", value: "SYP"}
     , 
{country: "BD", label: "BDT", value: "BDT"}
     , 
{country: "WS", label: "WST", value: "WST"}
     , 
{country: "TZ", label: "TZS", value: "TZS"}
     , 
{country: "KZ", label: "KZT", value: "KZT"}
     , 
{country: "TT", label: "TTD", value: "TTD"}
     , 
{country: "MN", label: "MNT", value: "MNT"}
     , 
{country: "TN", label: "TND", value: "TND"}
     , 
{country: "TR", label: "TRY", value: "TRY"}
     , 
{country: "TM", label: "TMT", value: "TMT"}
     , 
{country: "AE", label: "AED", value: "AED"}
     , 
{country: "UG", label: "UGX", value: "UGX"}
     , 
{country: "US", label: "USD", value: "USD"}
     , 
{country: "UZ", label: "UZS", value: "UZS"}
     , 
{country: "VU", label: "VUV", value: "VUV"}
     , 
{country: "KR", label: "KRW", value: "KRW"}
     , 
{country: "YE", label: "YER", value: "YER"}
     , 
{country: "JP", label: "JPY", value: "JPY"}
     , 
{country: "CN", label: "CNY", value: "CNY"}
     , 
{country: "ZM", label: "ZMW", value: "ZMW"}
     , 
{country: "PL", label: "PLN", value: "PLN"}
];

export default ibanCurrencyCodes;
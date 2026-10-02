import check from "@/imgs/content/display/circle-check.png";
import xmark from "@/imgs/content/display/circle-xmark.png";

export const businessModels = [
    {
        title: "Modelo tradicional de franquia",
        text: [
            "Pode envolver taxa de franquia",
            "Pode ter cobrança de royalties",
            "Regras operacionais mais rígidas",
            "Menor autonomia de gestão",
            "Contrato com prazo e multas rígidas",
        ],
        icon: xmark,
        style: 'border-2 border-white rounded-[18px] text-white'
    },
    {
        title: "Modelo Casa Brasileira",
        text: [
            "Loja própria autorizada",
            "Sem taxa de franquia",
            "Sem royalties",
            "Suporte de marca nacional",
            "Mais autonomia para o lojista",
        ],
        icon: check,
        style: 'border-2 border-[#707070] rounded-[18px] bg-white text-primary'
    },
];

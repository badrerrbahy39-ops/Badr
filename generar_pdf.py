from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.platypus import (SimpleDocTemplate, Table, TableStyle, Paragraph,
                                 Spacer, Image, HRFlowable, KeepTogether)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import PageBreak
from PIL import Image as PILImage
import os

OUTPUT = "/home/user/Badr/RH_Timepieces_Catalogo.pdf"

IMG1 = "/root/.claude/uploads/0e162889-6670-417a-b39e-60bc29f1aba3/ad879f7e-IMG_4056.png"
IMG2 = "/root/.claude/uploads/0e162889-6670-417a-b39e-60bc29f1aba3/6bfb7dff-IMG_4055.png"
IMG3 = "/root/.claude/uploads/0e162889-6670-417a-b39e-60bc29f1aba3/a2b92d2e-IMG_4058.png"
IMG4 = "/root/.claude/uploads/0e162889-6670-417a-b39e-60bc29f1aba3/f92ea6f0-IMG_4059.png"
IMG5 = "/root/.claude/uploads/0e162889-6670-417a-b39e-60bc29f1aba3/ef196d49-IMG_4060.png"
IMG6 = "/root/.claude/uploads/0e162889-6670-417a-b39e-60bc29f1aba3/4e218b4c-IMG_4061.png"
IMG7 = "/root/.claude/uploads/a3f8906c-d6b8-401e-ad57-a61478e1f3cb/3448e420-IMG_4063.png"
IMG8 = "/root/.claude/uploads/a3f8906c-d6b8-401e-ad57-a61478e1f3cb/ef7e2634-IMG_4064.png"
IMG9 = "/root/.claude/uploads/0e162889-6670-417a-b39e-60bc29f1aba3/d452b8d4-IMG_4065.png"
IMG10 = "/root/.claude/uploads/a3f8906c-d6b8-401e-ad57-a61478e1f3cb/c34ec821-IMG_4062.png"

GOLD   = colors.HexColor("#B8973A")
BLACK  = colors.HexColor("#111111")
DARK   = colors.HexColor("#1A1A1A")
LIGHT  = colors.HexColor("#F5F5F0")
WHITE  = colors.white
GREY   = colors.HexColor("#888888")

styles = getSampleStyleSheet()

title_style = ParagraphStyle("BrandTitle", fontName="Helvetica-Bold",
    fontSize=28, textColor=WHITE, alignment=TA_CENTER, spaceAfter=4)
subtitle_style = ParagraphStyle("BrandSub", fontName="Helvetica",
    fontSize=12, textColor=GOLD, alignment=TA_CENTER, spaceAfter=2)
tagline_style = ParagraphStyle("Tagline", fontName="Helvetica-Oblique",
    fontSize=9, textColor=colors.HexColor("#CCCCCC"), alignment=TA_CENTER)

section_style = ParagraphStyle("Section", fontName="Helvetica-Bold",
    fontSize=13, textColor=GOLD, alignment=TA_LEFT, spaceBefore=6, spaceAfter=4)
label_style = ParagraphStyle("Label", fontName="Helvetica-Bold",
    fontSize=8, textColor=GREY, alignment=TA_LEFT)
value_style = ParagraphStyle("Value", fontName="Helvetica",
    fontSize=9, textColor=BLACK, alignment=TA_LEFT)
price_style = ParagraphStyle("Price", fontName="Helvetica-Bold",
    fontSize=14, textColor=GOLD, alignment=TA_CENTER)
name_style = ParagraphStyle("WatchName", fontName="Helvetica-Bold",
    fontSize=16, textColor=BLACK, alignment=TA_LEFT, spaceBefore=4)
num_style = ParagraphStyle("Num", fontName="Helvetica-Bold",
    fontSize=11, textColor=WHITE, alignment=TA_CENTER)

ALIBABA_LINK = "https://www.alibaba.com/showroom/pagani-design-watch.html"
ALIBABA_LINK2 = "https://www.alibaba.com/premium/private_label_watches_dropshipping.html"

watches = [
    {
        "num": 1,
        "name": "RH Classic Silver White",
        "desc": "Esfera blanca · Bisel negro · Correa goma negra · Caja plata",
        "style": "Deportivo elegante · Uso diario · Versátil",
        "correa": "Goma negra",
        "caja": "Plata · Acero 316L",
        "movimiento": "Seiko VK63 Meca-Quartz",
        "cristal": "Zafiro antirreflejo",
        "agua": "100M / 10 ATM",
        "compra": "52 €",
        "venta": "149 €",
        "margen": "97 €",
        "multiplicador": "x2.9",
        "target": "Hombre 25–45 · Estilo activo · Primera compra de lujo",
        "argumento": "El más clásico y versátil. Ideal como regalo o primera compra.",
        "img": IMG1,
        "link": "https://www.alibaba.com/product-detail/PAGANI-DESIGN-PD-1644-Luxury-Chronograph_1601793782228.html",
    },
    {
        "num": 2,
        "name": "RH Classic Silver Black",
        "desc": "Esfera negra · Bisel negro · Correa goma negra · Caja plata",
        "style": "Deportivo masculino · Audaz · Urbano",
        "correa": "Goma negra",
        "caja": "Plata · Acero 316L",
        "movimiento": "Seiko VK63 Meca-Quartz",
        "cristal": "Zafiro antirreflejo",
        "agua": "100M / 10 ATM",
        "compra": "52 €",
        "venta": "149 €",
        "margen": "97 €",
        "multiplicador": "x2.9",
        "target": "Hombre 25–45 · Estilo urbano · Perfil más agresivo",
        "argumento": "Look oscuro y potente. Perfecto para noche y eventos.",
        "img": IMG2,
        "link": "https://www.alibaba.com/product-detail/PAGANI-DESIGN-PD-1644-Luxury-Chronograph_1601793782228.html",
    },
    {
        "num": 3,
        "name": "RH Rose Gold Edition",
        "desc": "Esfera blanca · Bisel negro · Correa goma negra · Caja oro rosa",
        "style": "Lujo premium · Alta gama visual · Aspiracional",
        "correa": "Goma negra",
        "caja": "Oro rosa · Acero 316L",
        "movimiento": "Seiko VK63 Meca-Quartz",
        "cristal": "Zafiro antirreflejo",
        "agua": "100M / 10 ATM",
        "compra": "52 €",
        "venta": "159 €",
        "margen": "107 €",
        "multiplicador": "x3.1",
        "target": "Hombre 28–50 · Aspiracional · Amante de marcas de lujo",
        "argumento": "El más fotogénico. Ideal para campañas Instagram y TikTok.",
        "img": IMG3,
        "link": "https://www.alibaba.com/product-detail/PAGANI-DESIGN-PD-1644-Luxury-Chronograph_1601793782228.html",
    },
    {
        "num": 4,
        "name": "RH Steel Classic White",
        "desc": "Esfera blanca · Bisel negro · Brazalete acero plata completo",
        "style": "Ejecutivo · Formal · Atemporal",
        "correa": "Brazalete acero inoxidable plata",
        "caja": "Plata · Acero 316L",
        "movimiento": "Seiko VK63 Meca-Quartz",
        "cristal": "Zafiro antirreflejo",
        "agua": "100M / 10 ATM",
        "compra": "48 €",
        "venta": "159 €",
        "margen": "111 €",
        "multiplicador": "x3.3",
        "target": "Profesional 30–55 · Reuniones · Eventos formales",
        "argumento": "El más elegante. Parece un reloj de 400€+ en fotografía.",
        "img": IMG4,
        "link": "https://www.alibaba.com/product-detail/Relojes-Hombre-Original-Pagani-Design-1662_1601155200218.html",
    },
    {
        "num": 5,
        "name": "RH Steel Classic Black",
        "desc": "Esfera negra · Bisel negro · Brazalete acero plata completo",
        "style": "Ejecutivo oscuro · Poderoso · Discreto",
        "correa": "Brazalete acero inoxidable plata",
        "caja": "Plata · Acero 316L",
        "movimiento": "Seiko VK63 Meca-Quartz",
        "cristal": "Zafiro antirreflejo",
        "agua": "100M / 10 ATM",
        "compra": "48 €",
        "venta": "159 €",
        "margen": "111 €",
        "multiplicador": "x3.3",
        "target": "Hombre 28–50 · Serio · Minimalista de lujo",
        "argumento": "El más sobrio y profesional de toda la colección.",
        "img": IMG5,
        "link": "https://www.alibaba.com/product-detail/Relojes-Hombre-Original-Pagani-Design-1662_1601155200218.html",
    },
    {
        "num": 6,
        "name": "RH Two-Tone White",
        "desc": "Esfera blanca · Bisel oro rosa · Brazalete dos tonos plata + oro rosa",
        "style": "Ultra premium · Estilo Rolex two-tone",
        "correa": "Brazalete bicolor (plata + oro rosa)",
        "caja": "Dos tonos · Acero 316L",
        "movimiento": "Seiko VK63 Meca-Quartz",
        "cristal": "Zafiro antirreflejo",
        "agua": "100M / 10 ATM",
        "compra": "48 €",
        "venta": "169 €",
        "margen": "121 €",
        "multiplicador": "x3.5",
        "target": "Hombre 30–55 · Comprador premium · Quiere lo mejor",
        "argumento": "El más parecido a un Rolex Daytona two-tone. Máximo impacto visual.",
        "img": IMG6,
        "link": "https://www.alibaba.com/showroom/pagani-design-watch.html",
    },
    {
        "num": 7,
        "name": "RH Two-Tone Salmon",
        "desc": "Esfera salmón · Bisel oro rosa · Brazalete dos tonos plata + oro rosa",
        "style": "Exclusivo · Edición especial · Tendencia mundial de lujo",
        "correa": "Brazalete bicolor (plata + oro rosa)",
        "caja": "Dos tonos · Acero 316L",
        "movimiento": "Seiko VK63 Meca-Quartz",
        "cristal": "Zafiro antirreflejo",
        "agua": "100M / 10 ATM",
        "compra": "48 €",
        "venta": "179 €",
        "margen": "131 €",
        "multiplicador": "x3.7",
        "target": "Hombre 28–45 · Conocedor · Coleccionista · Quiere diferenciarse",
        "argumento": "Esfera salmón = tendencia mundial de alta relojería. El más exclusivo.",
        "img": IMG7,
        "link": "https://www.alibaba.com/showroom/pagani-design-watch.html",
    },
    {
        "num": 8,
        "name": "RH Blue Bezel Edition",
        "desc": "Esfera blanca · Bisel azul cerámico · Brazalete acero plata",
        "style": "Premium sport · Llamativo · Deportivo de lujo",
        "correa": "Brazalete acero inoxidable plata",
        "caja": "Plata · Acero 316L",
        "movimiento": "Seiko VK63 Meca-Quartz",
        "cristal": "Zafiro antirreflejo",
        "agua": "100M / 10 ATM",
        "compra": "48 €",
        "venta": "169 €",
        "margen": "121 €",
        "multiplicador": "x3.5",
        "target": "Hombre 25–45 · Amante del color · Estilo mediterráneo",
        "argumento": "Bisel azul cerámico icónico. Muy reconocible y fotogénico.",
        "img": IMG8,
        "link": "https://www.alibaba.com/showroom/pagani-design-watch.html",
    },
    {
        "num": 9,
        "name": "RH Green Signature",
        "desc": "Esfera blanca/plata · Bisel verde cerámico · Brazalete acero plata",
        "style": "Firma de marca · Distintivo · El reloj que define RH",
        "correa": "Brazalete acero inoxidable plata",
        "caja": "Plata · Acero 316L",
        "movimiento": "Seiko VK63 Meca-Quartz",
        "cristal": "Zafiro antirreflejo",
        "agua": "100M / 10 ATM",
        "compra": "48 €",
        "venta": "169 €",
        "margen": "121 €",
        "multiplicador": "x3.5",
        "target": "Hombre 25–40 · Trendy · Sabe de relojes · Quiere destacar",
        "argumento": "El reloj que define la identidad RH. Verde = lujo (Rolex Submariner).",
        "img": IMG9,
        "link": "https://www.alibaba.com/showroom/pagani-design-watch.html",
    },
    {
        "num": 10,
        "name": "RH Two-Tone Black",
        "desc": "Esfera negra · Bisel oro rosa · Brazalete dos tonos plata + oro rosa",
        "style": "Lujo oscuro · Bold · Noche y eventos exclusivos",
        "correa": "Brazalete bicolor (plata + oro rosa)",
        "caja": "Dos tonos · Acero 316L",
        "movimiento": "Seiko VK63 Meca-Quartz",
        "cristal": "Zafiro antirreflejo",
        "agua": "100M / 10 ATM",
        "compra": "48 €",
        "venta": "169 €",
        "margen": "121 €",
        "multiplicador": "x3.5",
        "target": "Hombre 28–50 · Quiere lujo en tono oscuro · Elegancia nocturna",
        "argumento": "Oro rosa + negro = combinación de máxima distinción y elegancia.",
        "img": IMG10,
        "link": "https://www.alibaba.com/showroom/pagani-design-watch.html",
    },
]

def resize_image(path, max_w=200, max_h=200):
    img = PILImage.open(path)
    w, h = img.size
    ratio = min(max_w / w, max_h / h)
    new_w, new_h = int(w * ratio), int(h * ratio)
    resized = img.resize((new_w, new_h), PILImage.LANCZOS)
    out = path + "_resized.png"
    resized.save(out)
    return out, new_w, new_h

def build_pdf():
    doc = SimpleDocTemplate(OUTPUT, pagesize=A4,
                            rightMargin=1.5*cm, leftMargin=1.5*cm,
                            topMargin=1.5*cm, bottomMargin=1.5*cm)
    W, H = A4
    content_w = W - 3*cm
    story = []

    # ── COVER ──────────────────────────────────────────────────────────────
    cover_bg = Table([[""]], colWidths=[content_w], rowHeights=[4*cm])
    cover_bg.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), DARK),
        ("ROUNDEDCORNERS", [8]),
    ]))
    story.append(cover_bg)

    header_data = [[
        Paragraph("RH TIMEPIECES", title_style),
    ]]
    header_tbl = Table(header_data, colWidths=[content_w])
    header_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), DARK),
        ("TOPPADDING",    (0,0), (-1,-1), 18),
        ("BOTTOMPADDING", (0,0), (-1,-1), 4),
    ]))
    story.append(header_tbl)

    sub_data = [[Paragraph("PRIMERA COLECCIÓN — CATÁLOGO OFICIAL 2026", subtitle_style)]]
    sub_tbl = Table(sub_data, colWidths=[content_w])
    sub_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), DARK),
        ("TOPPADDING",    (0,0), (-1,-1), 2),
        ("BOTTOMPADDING", (0,0), (-1,-1), 12),
    ]))
    story.append(sub_tbl)

    tag_data = [[Paragraph("Calidad · Profesionalidad · Carisma", tagline_style)]]
    tag_tbl = Table(tag_data, colWidths=[content_w])
    tag_tbl.setStyle(TableStyle([
        ("BACKGROUND",    (0,0), (-1,-1), DARK),
        ("TOPPADDING",    (0,0), (-1,-1), 0),
        ("BOTTOMPADDING", (0,0), (-1,-1), 18),
    ]))
    story.append(tag_tbl)
    story.append(Spacer(1, 0.6*cm))

    # ── EACH WATCH ─────────────────────────────────────────────────────────
    for w in watches:
        img_path, iw, ih = resize_image(w["img"], 180, 180)

        num_cell = Table([[Paragraph(f"#{w['num']:02d}", num_style)]],
                         colWidths=[1.2*cm], rowHeights=[1.2*cm])
        num_cell.setStyle(TableStyle([
            ("BACKGROUND",    (0,0), (-1,-1), GOLD),
            ("ROUNDEDCORNERS", [4]),
            ("VALIGN",        (0,0), (-1,-1), "MIDDLE"),
        ]))

        watch_img = Image(img_path, width=iw*0.55, height=ih*0.55)

        img_block = Table([[num_cell], [Spacer(1,0.3*cm)], [watch_img]],
                          colWidths=[iw*0.55 + 0.5*cm])
        img_block.setStyle(TableStyle([
            ("ALIGN",  (0,0), (-1,-1), "CENTER"),
            ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ]))

        # Info column
        def row(label, val):
            return [Paragraph(label, label_style), Paragraph(val, value_style)]

        link_para = Paragraph(
            f'<link href="{w["link"]}" color="#B8973A"><u>Ver en Alibaba →</u></link>',
            ParagraphStyle("link", fontName="Helvetica", fontSize=8, textColor=GOLD)
        )

        info_table_data = [
            [Paragraph(w["name"], name_style), ""],
            [Paragraph(w["desc"], ParagraphStyle("desc", fontName="Helvetica-Oblique",
                fontSize=8, textColor=GREY)), ""],
            ["", ""],
            row("ESTILO",      w["style"]),
            row("CORREA",      w["correa"]),
            row("CAJA",        w["caja"]),
            row("MOVIMIENTO",  w["movimiento"]),
            row("CRISTAL",     w["cristal"]),
            row("AGUA",        w["agua"]),
            row("TARGET",      w["target"]),
            row("VENTAJA",     w["argumento"]),
            ["", ""],
            [link_para, ""],
        ]
        info_tbl = Table(info_table_data, colWidths=[2.8*cm, 9.5*cm])
        info_tbl.setStyle(TableStyle([
            ("SPAN",        (0, 0), (1, 0)),
            ("SPAN",        (0, 1), (1, 1)),
            ("SPAN",        (0, 2), (1, 2)),
            ("SPAN",        (0, 12), (1, 12)),
            ("VALIGN",      (0, 0), (-1, -1), "TOP"),
            ("TOPPADDING",  (0, 0), (-1, -1), 2),
            ("BOTTOMPADDING",(0, 0), (-1, -1), 2),
            ("LINEBELOW",   (0, 1), (1, 1), 0.5, colors.HexColor("#DDDDDD")),
        ]))

        # Price box
        price_data = [
            [Paragraph("COMPRA", label_style),
             Paragraph("VENTA",  label_style),
             Paragraph("MARGEN", label_style),
             Paragraph("x",      label_style)],
            [Paragraph(w["compra"],       price_style),
             Paragraph(w["venta"],        price_style),
             Paragraph(w["margen"],       ParagraphStyle("mg", fontName="Helvetica-Bold",
                 fontSize=14, textColor=colors.HexColor("#2ECC71"), alignment=TA_CENTER)),
             Paragraph(w["multiplicador"], ParagraphStyle("mult", fontName="Helvetica-Bold",
                 fontSize=14, textColor=colors.HexColor("#3498DB"), alignment=TA_CENTER))],
        ]
        price_tbl = Table(price_data, colWidths=[3*cm, 3*cm, 3*cm, 3.3*cm])
        price_tbl.setStyle(TableStyle([
            ("BACKGROUND",    (0,0), (-1,-1), LIGHT),
            ("BACKGROUND",    (2,0), (2,1), colors.HexColor("#EAFAF1")),
            ("ROUNDEDCORNERS",[6]),
            ("ALIGN",         (0,0), (-1,-1), "CENTER"),
            ("VALIGN",        (0,0), (-1,-1), "MIDDLE"),
            ("TOPPADDING",    (0,0), (-1,-1), 6),
            ("BOTTOMPADDING", (0,0), (-1,-1), 6),
            ("GRID",          (0,0), (-1,-1), 0.3, colors.HexColor("#DDDDDD")),
        ]))

        # Combine image + info
        main_row = Table([[img_block, info_tbl]],
                         colWidths=[iw*0.55 + 1*cm, content_w - iw*0.55 - 1*cm])
        main_row.setStyle(TableStyle([
            ("VALIGN",      (0,0), (-1,-1), "TOP"),
            ("LEFTPADDING", (1,0), (1,0), 12),
        ]))

        card_data = [
            [main_row],
            [price_tbl],
        ]
        card = Table(card_data, colWidths=[content_w])
        card.setStyle(TableStyle([
            ("BACKGROUND",    (0,0), (-1,-1), WHITE),
            ("BOX",           (0,0), (-1,-1), 0.8, colors.HexColor("#DDDDDD")),
            ("ROUNDEDCORNERS",[8]),
            ("TOPPADDING",    (0,0), (-1,-1), 12),
            ("BOTTOMPADDING", (0,0), (-1,-1), 12),
            ("LEFTPADDING",   (0,0), (-1,-1), 12),
            ("RIGHTPADDING",  (0,0), (-1,-1), 12),
            ("LINEABOVE",     (0,1), (-1,1), 0.5, colors.HexColor("#EEEEEE")),
        ]))

        story.append(KeepTogether([card]))
        story.append(Spacer(1, 0.5*cm))

    # ── SUMMARY TABLE ──────────────────────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph("RESUMEN FINANCIERO — COLECCIÓN COMPLETA", section_style))
    story.append(Spacer(1, 0.3*cm))

    sum_header = ["#", "Nombre RH", "Correa", "Compra", "Venta", "Margen", "x"]
    sum_rows = [sum_header]
    for w in watches:
        sum_rows.append([
            str(w["num"]),
            w["name"],
            w["correa"],
            w["compra"],
            w["venta"],
            w["margen"],
            w["multiplicador"],
        ])
    sum_rows.append(["", "TOTAL (1 de cada)", "", "500 €", "1.630 €", "1.130 €", "x3.3"])

    col_ws = [0.8*cm, 4.8*cm, 4.2*cm, 1.8*cm, 1.8*cm, 1.8*cm, 1.5*cm]
    sum_tbl = Table(sum_rows, colWidths=col_ws)
    ts = TableStyle([
        ("BACKGROUND",    (0,0), (-1,0), DARK),
        ("TEXTCOLOR",     (0,0), (-1,0), GOLD),
        ("FONTNAME",      (0,0), (-1,0), "Helvetica-Bold"),
        ("FONTSIZE",      (0,0), (-1,0), 8),
        ("BACKGROUND",    (0,-1), (-1,-1), colors.HexColor("#EAFAF1")),
        ("FONTNAME",      (0,-1), (-1,-1), "Helvetica-Bold"),
        ("FONTSIZE",      (0,-1), (-1,-1), 8),
        ("ALIGN",         (0,0), (-1,-1), "CENTER"),
        ("VALIGN",        (0,0), (-1,-1), "MIDDLE"),
        ("FONTSIZE",      (0,1), (-1,-2), 8),
        ("ROWBACKGROUNDS",(0,1), (-1,-2), [WHITE, LIGHT]),
        ("GRID",          (0,0), (-1,-1), 0.3, colors.HexColor("#CCCCCC")),
        ("TOPPADDING",    (0,0), (-1,-1), 5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 5),
    ])
    sum_tbl.setStyle(ts)
    story.append(sum_tbl)

    story.append(Spacer(1, 0.6*cm))

    note_style = ParagraphStyle("Note", fontName="Helvetica",
        fontSize=7.5, textColor=GREY, spaceBefore=4)
    story.append(Paragraph("ESPECIFICACIONES TÉCNICAS COMUNES", section_style))
    specs = [
        ("Movimiento", "Seiko VK63 Meca-Quartz — híbrido cuarzo/automático"),
        ("Caja", "Acero inoxidable 316L · 40mm diámetro · 12mm grosor"),
        ("Cristal", "Zafiro con tratamiento antirreflejo"),
        ("Resistencia", "100M / 10 ATM — apto ducha, natación, lluvia"),
        ("Corona", "Roscada para mayor protección al agua"),
        ("Funciones", "Cronógrafo multifunción + Fecha"),
        ("Peso", "~134g"),
        ("Garantía", "3 años incluida"),
        ("MOQ", "1 unidad — sin stock mínimo"),
        ("Personalización", "Logo/diseño gráfico RH disponible (OEM)"),
        ("Modelo", "Pagani Design — homenaje Daytona. Legal. Diseño propio."),
        ("Envío", "Dropshipping directo al cliente final"),
    ]
    spec_data = [[Paragraph(k, label_style), Paragraph(v, value_style)] for k,v in specs]
    spec_tbl = Table(spec_data, colWidths=[3.5*cm, content_w - 3.5*cm])
    spec_tbl.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0,0), (-1,-1), [WHITE, LIGHT]),
        ("GRID",           (0,0), (-1,-1), 0.3, colors.HexColor("#DDDDDD")),
        ("TOPPADDING",     (0,0), (-1,-1), 4),
        ("BOTTOMPADDING",  (0,0), (-1,-1), 4),
        ("LEFTPADDING",    (0,0), (-1,-1), 6),
    ]))
    story.append(spec_tbl)

    story.append(Spacer(1, 0.8*cm))
    story.append(HRFlowable(width="100%", thickness=0.5, color=GOLD))
    story.append(Spacer(1, 0.2*cm))
    story.append(Paragraph(
        "RH Timepieces · Primera Colección 2026 · Uso interno · Confidencial",
        ParagraphStyle("footer", fontName="Helvetica", fontSize=7,
                       textColor=GREY, alignment=TA_CENTER)
    ))

    doc.build(story)
    print(f"PDF generado: {OUTPUT}")

build_pdf()

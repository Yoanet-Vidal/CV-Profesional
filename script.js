$(document).ready(function(){
    var windowHeight = $(window).height();
    var $cards = $('.content-card');
    var $sideContentLeft = $('.side-content-left');
    var $fixedBackground = $('.fixed-background-image'); // Referencia al fondo derecho
    var $floatingText = $('#floating-text');
    var $nameText = $('.side-header-fixed .name-text');
    var $scrollToTopBtn = $('#scrollToTopBtn'); // Referencia al botón de Subir Arriba

    // ===========================================
    // 1. Definiciones para las animaciones (3 PALETAS SÓLIDAS)
    // ===========================================
    var sectionData = [
    //      Left Color       Right Color      Name Color      Keyword Color
    // Rojo: #CD3333, Negro: #222, Gris Claro: #CACACA
    
    // 0: about (Light Gray Left -> Red Right)
    { id: 'about', keyword: 'ACERCA', baseColor: '#CACACA', rightBaseColor: '#CD3333', nameColor: '#222', keywordColor: '#CD3333' }, 
    // 1: skills (Light Gray Left -> Red Right)
    { id: 'skills', keyword: 'HABILIDADES', baseColor: '#CACACA', rightBaseColor: '#CD3333', nameColor: '#222', keywordColor: '#CD3333' }, 
    
    // 2: portfolio (Red Left -> Black Right)
    { id: 'portfolio', keyword: 'PROYECTOS', baseColor: '#CD3333', rightBaseColor: '#222', nameColor: '#FFF', keywordColor: '#222' }, 
    // 3: education (Red Left -> Black Right)
    { id: 'education', keyword: 'FORMACIÓN', baseColor: '#CD3333', rightBaseColor: '#222', nameColor: '#FFF', keywordColor: '#222' }, 
    
    // 4: experience (Black Left -> Gray Right)
    { id: 'experience', keyword: 'EXPERIENCIA', baseColor: '#222', rightBaseColor: '#CACACA', nameColor: '#CD3333', keywordColor: '#FFF' }, 
    // 5: contact (Black Left -> Gray Right)
    { id: 'contact', keyword: 'CONTACTO', baseColor: '#222', rightBaseColor: '#CACACA', nameColor: '#CD3333', keywordColor: '#FFF' } 
    ];

    var currentSectionIndex = 0;

    // ===========================================
    // 2. Función principal de Scroll (Detecta la sección y actualiza el color)
    // ===========================================
    function checkScroll() {
        var scrollPos = $(window).scrollTop();
        var newSectionIndex = currentSectionIndex;
        var maxScroll = $(document).height() - $(window).height();

        // 🔑 Optimización 1: Lógica del botón Subir Arriba integrada
        if (scrollPos > windowHeight * 0.5) {
            $scrollToTopBtn.fadeIn(400); 
        } else {
            $scrollToTopBtn.fadeOut(400); 
        }

        // Caso especial: Si estamos cerca del final del documento, forzamos la última sección
        if (scrollPos >= maxScroll - 50) { 
            newSectionIndex = $cards.length - 1; 
        } else {
            $cards.each(function(index) {
                var $card = $(this);
                var cardTop = $card.offset().top;
                
                // Detección de Sección Actual: Si el punto de anclaje (mitad de la pantalla) 
                if (scrollPos + (windowHeight * 0.5) >= cardTop) {
                    newSectionIndex = index;
                }
            });
        }
        
        // Aplicar cambios de Color y Texto si la sección ha cambiado
        if (newSectionIndex !== currentSectionIndex) {
            currentSectionIndex = newSectionIndex;
            var data = sectionData[currentSectionIndex];
            
            // 1. CAMBIAR FONDO IZQUIERDO
            $sideContentLeft.css('background-image', 'none');
            $sideContentLeft.css('background-color', data.baseColor);
            
            // 2. CAMBIAR FONDO DERECHO
            $fixedBackground.css('background-color', data.rightBaseColor);

            // 3. CAMBIAR COLOR DEL NOMBRE (H1)
            $nameText.css('color', data.nameColor);
            
            // 4. CAMBIAR TEXTO FLOTANTE
            $floatingText.css('opacity', 0).text(data.keyword);
            $floatingText.css('color', data.keywordColor).animate({ opacity: 0.2 }, 400); 
        }
    }

    // Ejecutar al cargar y en cada scroll
    checkScroll();
    $(window).on('scroll', checkScroll);
    $(window).on('resize', function() {
        windowHeight = $(window).height();
        checkScroll();
    });


    // ===========================================
    // 3. Funcionalidad de Lightbox (Proyecto)
    // ===========================================
    function closeLightbox() {
        $('#lightbox-overlay').removeClass('visible');
        $('body').css('overflow', 'auto'); 
    }

    $('.project-item-thumb').on('click', function(e) {
        e.preventDefault(); 
        var fullSrc = $(this).data('full-src');
        
        if (fullSrc) {
            $('#lightbox-image').attr('src', fullSrc);
            $('#lightbox-overlay').addClass('visible');
            $('body').css('overflow', 'hidden'); 
        }
    });

    $('#lightbox-close').on('click', closeLightbox);

    $('#lightbox-overlay').on('click', function(e) {
        if (e.target.id === 'lightbox-overlay') { 
            closeLightbox();
        }
    });

    // ===========================================
    // 4. Funcionalidad del botón Subir Arriba (Solo el Click)
    // ===========================================
    $scrollToTopBtn.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 600); 
        return false;
    });
});
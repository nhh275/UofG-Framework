from django.shortcuts import render

def home(request):
    return render(request, 'index.html')

def alignment(request):
    return render(request, 'alignment.html')

def colourUtilities(request):
    return render(request, 'colourUtilities.html')

def flexBoxUtilities(request):
    return render(request, 'flexBoxUtilities.html')

def interactions(request):
    return render(request, 'interactions.html')

def layoutUtilities(request):
    return render(request, 'layoutUtilities.html')

def sizingUtilities(request):
    return render(request, 'sizingUtilities.html')

def spacingUtilities(request):
    return render(request, 'spacingUtilities.html')

def typographyUtilities(request):
    return render(request, 'typographyUtilities.html')

def visibilityUtilities(request):
    return render(request, 'visibilityUtilities.html')

def accessibility(request):
    return render(request, 'accessibility.html')

def borderUtilities(request):
    return render(request, 'borderUtilities.html')

def shadowUtilities(request):
    return render(request, 'shadowUtilities.html')

def tabs(request):
    return render(request, 'tabs.html')

def dropdown(request):
    return render(request, 'dropdown.html')

def buttons(request):
    return render(request, 'buttons.html')

def tiles(request):
    return render(request, 'tiles.html')

def accordions(request):
    return render(request, 'accordions.html')

def block_quotes(request):
    return render(request, 'block-quotes.html')

def download_links(request):
    return render(request, 'download-links.html')

def images(request):
    return render(request, 'images.html')

def radio_buttons(request):
    return render(request, 'radio-buttons.html')

def tables(request):
    return render(request, 'tables.html')

def text_blocks(request):
    return render(request, 'text-blocks.html')

def checkbox(request):
    return render(request, 'checkbox.html')

def text_input(request):
    return render(request, 'text-input.html')   
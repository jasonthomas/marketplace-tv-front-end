define('views/homepage',
    ['core/l10n', 'core/models', 'core/z', 'templates', 'spatial-navigation'],
    function(l10n, models, z, nunjucks, SpatialNavigation) {
    var gettext = l10n.gettext;
    var appsModel = models('apps');

    // Initialize spatial navigation.
    SpatialNavigation.init();

    // Define the navigable elements.
    SpatialNavigation.add({
        selector: '.focusable'
    });

    z.page.on('loaded', function() {
        // Add 'tabindex="-1"' to "currently-existing" navigable elements.
        SpatialNavigation.makeFocusable();

        // Focus the first navigable element.
        SpatialNavigation.focus();
    });

    z.page.on('focus', '.focusable', function() {
        // Update app preview area with current focused app.
        z.page.find('.app-preview').html(
            nunjucks.env.render('_includes/app_preview.html', {
                app: appsModel.lookup($(this).data('slug'))
            })
        );
    });

    return function(builder) {
        builder.start('homepage.html');

        builder.z('type', 'root');
        builder.z('title', gettext('Homepage'));
    };
});

import { get_document_row } from './_functions.js';

document.addEventListener('DOMContentLoaded', () => {
    if ( !$("#documents_search_input").length ) {
        return;
    }

    if ($("#local_search_request").length) {
        $("#documents_section_search").addClass('hidden');
        return;
    }

    const inputField = $("#documents_search_input");

    let lastOpenedSectionSelector = null;
    inputField.on('keyup', () => {
        let results = [];
        const request = inputField.val();
        const localSearchResultObject = $('#local_search_result');
        $('.js-document-item').each(function() {
            const regionName = ' ' + $(this).find('a').text().toLowerCase();
            if ( regionName.indexOf( request.toLowerCase() ) > -1 ) {
                results.push({
                    name: $(this).find('a').text(),
                    file: $(this).find('a').attr('href'),
                });
            }
        });

        if ( results.length && request.length > 2 ) {
            if ( lastOpenedSectionSelector == null ) {
                lastOpenedSectionSelector = '#' + $('#all_documents .js-tabs-block.active').attr('id');
                $('#all_documents .js-tabs-block.active').removeClass('active');
            }

            localSearchResultObject.find('tbody').html('');
            results.forEach((current) => {
                localSearchResultObject.find('tbody').append( get_document_row(current) );//getDocumentRow(current) );
            });

            localSearchResultObject.addClass('active');
        } else {
            localSearchResultObject.find('tbody').html('');
            localSearchResultObject.removeClass('active');
            $(lastOpenedSectionSelector).addClass('active');
            lastOpenedSectionSelector = null;
        }
    });

});
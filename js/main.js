$(document).ready(function() {
    $.ajax({
        url: 'php/obtenerProductos.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            tableProducts = $('#products');

            for (var i = 0; i < data.length; i++) {
                tableProducts.append('<tr><td>' + data[i].nombre + '</td><td>' + data[i].precio + '</td><td><input type="number" class="product-quantity" min="1" value="1"></td><td><button class="btn-add-product" onclick="addProduct(' + data[i].id + ', this)">Añadir</button></td></tr>');
            }
        },
        error: function() { // Aquí está la corrección
            console.log('Error al obtener los productos');
        }
    });

    $('#search-product').on('change', function() {
        var search = $(this).val().toLowerCase();
        $('#products tbody tr').each(function(index) {
            var name = $(this).find('td').eq(0).text().toLowerCase();
            if (name.indexOf(search) === -1) {
                if (index === 0) { // Asegurarse de que el encabezado siempre se muestre
                    $(this).show();
                    return;
                }
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });
});

function addProduct(idProduct, button) {
    var quantityInput = $(button).closest('tr').find('.product-quantity');
    var quantityToAdd = parseInt(quantityInput.val());

    $.ajax({
        url: 'php/obtenerProductos.php',
        type: 'GET',
        data: { id: idProduct },
        dataType: 'json',
        success: function(data) {
            if (!data || data.error) {
                console.error('Producto no encontrado');
                return;
            }

            var tableBody = $('#product-list-body');
            var row = tableBody.find('tr[data-id="' + data.id + '"]');

            if (row.length > 0) {
                var quantity = row.find('.quantity');
                quantity.text(parseInt(quantity.text()) + quantityToAdd);
            } else {
                var newRow = `
                    <tr data-id="${data.id}">
                        <td>${data.nombre}</td>
                        <td class="quantity">${quantityToAdd}</td>
                        <td class="price">${data.precio}</td>
                        <td>
                            <button class="btn-delete-product" onclick="deleteProduct(${data.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
                tableBody.append(newRow);
            }

            updateTotal();
        },
        error: function(e) {
            console.error('Error al obtener el producto', e);
        }
    });
}

function deleteProduct(idProduct) {
    var row = $('#product-list-body').find('tr[data-id="' + idProduct + '"]');
    if (row.length > 0) {
        row.remove();
        updateTotal();
    }
}

function updateTotal() {
    var total = 0;
    $('#product-list-body tr').each(function() {
        var quantity = parseInt($(this).find('.quantity').text());
        var price = parseFloat($(this).find('.price').text());
        total += quantity * price;
    });

    $('#total').text(total.toFixed(2)); // Actualizar total con 2 decimales
}
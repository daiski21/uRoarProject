 h1 Hello #{user.username}
            table
                thead
                  tr
                    th Name
                    th Description
                    th Price
                    th Category
                    th Seller
                    th Date Posted
                tbody#table-body


add


 .row
              h2.major Add New 
          .row
              if (alertMessage.length > 0)
                .form-alert
                  h4.alertMesage
                      | #{alertMessage}
              form(method="POST", action="/new")
                p Name 
                  span.req *
                  input.form-control(type="text", placeholder="Name", name="item_name")
                p Username 
                  span.req *
                  input.form-control(type="text", placeholder="Username", value='#{user.username}' name="username")  
                P Image Link
                  input.form-control(type="text", placeholder="Image Link", name="image")  
                p Description
                  span.req *
                  input.form-control(type="text", placeholder="Description", name="description")
                P Category
                  input.form-control(type="text", placeholder="Category", name="category")
                P Price
                  input.form-control(type="text", placeholder="Price", name="price")  
                P Contact Number
                  input.form-control(type="text", placeholder="Contact Number", name="number")  
                button.btn.btn-primary(type="submit")
                    i.fa.fa-paper-plane
                    |  Submit


update
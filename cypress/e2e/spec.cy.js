describe("Burrito Builder", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      fixture: "orders",
    }).as("orders");

    cy.intercept("POST", "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      fixture: "postOrders",
    }).as("postOrders");
    cy.visit("http://localhost:3000/");
  });

  it("shows header, order form, and existing orders on page load", () => {
    const buttons = [
      { name: "beans", value: "beans" },
      { name: "steak", value: "steak" },
      { name: "carnitas", value: "carnitas" },
      { name: "sofritas", value: "sofritas" },
      { name: "lettuce", value: "lettuce" },
      { name: "queso fresco", value: "queso fresco" },
      { name: "pico de gallo", value: "pico de gallo" },
      { name: "hot sauce", value: "hot sauce" },
      { name: "guacamole", value: "guacamole" },
      { name: "jalapenos", value: "jalapenos" },
      { name: "cilantro", value: "cilantro" },
      { name: "sour cream", value: "sour cream" },
    ];
    buttons.forEach((button) => {
      cy.get(`button[name="${button.name}"]`).should(
        "have.attr",
        "value",
        button.value
      );
    });
    cy.get("header").should("contain", "Burrito Builder");
    cy.get("form").get("input").should("have.attr", "placeholder", "Name");
    cy.get('header').find('p').should('contain', "Order: Nothing selected")
    cy.get(".submit-button").should("contain", "Submit Order");
    cy.get("section").get(".order").should("have.length", 3);
    cy.get(".order").first().find('h3').should("contain", "Pat");
    cy.get(".order")
      .first()
      .find(".ingredient-list")
      .children()
      .first()
      .should("contain", "beans");
    cy.get(".order")
      .first()
      .find(".ingredient-list")
      .children()
      .last()
      .should("contain", "jalapeno");
    cy.get(".order").last().find('h3').should("contain", "Alex");
    cy.get(".order")
      .last()
      .find(".ingredient-list")
      .children()
      .first()
      .should("contain", "sofritas");
    cy.get(".order")
      .last()
      .find(".ingredient-list")
      .children()
      .last()
      .should("contain", "queso fresco");
  });

  it("can submit a new order", () => {
    cy.get("section").get(".order").should("have.length", 3);
    cy.get("form").get("input").type("John").should("have.value", "John");
    cy.get('[name="pico de gallo"]').click();
    cy.get("p").should("contain", "Order: pico de gallo");
    cy.get('[name="beans"]').click();
    cy.get("p").should("contain", "Order: pico de gallo, beans");
    cy.get('[name="guacamole"]').click();
    cy.get("p").should("contain", "Order: pico de gallo, beans, guacamole");
    cy.get('[name="steak"]').click();
    cy.get("p").should("contain", "Order: pico de gallo, beans, guacamole, steak");
    cy.get(".submit-button").click();
    cy.get("section").get(".order").should("have.length", 4);
    cy.get(".order").first().find('h3').should("contain", "Pat");
    cy.get(".order")
      .first()
      .find(".ingredient-list")
      .children()
      .first()
      .should("contain", "beans");
    cy.get(".order")
      .first()
      .find(".ingredient-list")
      .children()
      .last()
      .should("contain", "jalapeno");
    cy.get(".order").last().contains("h3", "John");
    cy.get(".order")
      .last()
      .find(".ingredient-list")
      .children()
      .first()
      .should("contain", "pico de gallo");
    cy.get(".order")
      .last()
      .find(".ingredient-list")
      .children()
      .last()
      .should("contain", "steak");
  });

// SAD PATH / ERROR TESTING 

  it("will not submit an order with missing ingredient information", () => {
    cy.get("section").get(".order").should("have.length", 3);
    cy.get("form").get("input").type("John").should("have.value", "John");
    cy.get("p").should("contain", "Order: Nothing selected");
    cy.get(".submit-button").click();
    cy.get("p").should(
      "contain",
      "Please enter a name and select ingredient(s) to order."
    );
    cy.get("section").get(".order").should("not.have.length", 4);
  });

  it("will not submit an order with missing name information", () => {
    cy.get("section").get(".order").should("have.length", 3);
    cy.get('[name="pico de gallo"]').click();
    cy.get("p").should("contain", "Order: pico de gallo");
    cy.get('[name="beans"]').click();
    cy.get("p").should("contain", "Order: pico de gallo, beans");
    cy.get('[name="guacamole"]').click();
    cy.get("p").should("contain", "Order: pico de gallo, beans, guacamole");
    cy.get('[name="steak"]').click();
    cy.get("p").should("contain", "Order: pico de gallo, beans, guacamole, steak");
    cy.get(".submit-button").click();
    cy.get("p").should(
      "contain",
      "Please enter a name and select ingredient(s) to order."
    );
    cy.get("section").get(".order").should("not.have.length", 4);
  });

  it("will not submit an order with missing order information", () => {
    cy.get("section").get(".order").should("have.length", 3);
    cy.get("p").should("contain", "Order: Nothing selected");
    cy.get(".submit-button").click();
    cy.get("p").should(
      "contain",
      "Please enter a name and select ingredient(s) to order."
    );
    cy.get("section").get(".order").should("not.have.length", 4);
  });
});

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verifica o  título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
  it("Preencher Nomes", function () {
    const longText =
      "AAAAAAAAAAA BBBBBBBBBBBBB CCCCCCCCCCCC DDDDDDDDDDDDD EEEEEEEEEEEE FFFFFFFFFF GGGGGGGGGGG HHHHHHHHHHH IIIIIII";
    cy.get("#firstName").type("Lucas");
    cy.get("#lastName").type("Santos");
    cy.get("#email").type("teste@gmail.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });

  it("mensagem de erro ao submeter e-mail invalido", function () {
    const longText =
      "AAAAAAAAAAA BBBBBBBBBBBBB CCCCCCCCCCCC DDDDDDDDDDDDD EEEEEEEEEEEE FFFFFFFFFF GGGGGGGGGGG HHHHHHHHHHH IIIIIII";
    cy.get("#firstName").type("Lucas");
    cy.get("#lastName").type("Santos");
    cy.get("#email").type("teste@gmail.com");
    cy.get("#phone-checkbox").click();
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("Input radio", function () {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(function ($radio) {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });

  it("Checkbox", function () {
    cy.get('input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should("not.be.checked", "Telefone");
  });

  // it('campo telefone vazio se for colocado valor nao num', function(){

  //     cy.get('#phone')
  //     .type('abcde')
  //     .should('have.value','')
  // })
  it("preenche e limpa os campos", function () {
    const longText =
      "AAAAAAAAAAA BBBBBBBBBBBBB CCCCCCCCCCCC DDDDDDDDDDDDD EEEEEEEEEEEE FFFFFFFFFF GGGGGGGGGGG HHHHHHHHHHH IIIIIII";
    cy.get("#firstName").type("Lucas").should("have.value", "Lucas");
    cy.get("#lastName").type("Santos");
    cy.get("#email").type("teste@gmail.com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area")
      .type(longText, { delay: 0 })
      .should("have.value", longText);
    cy.get("#open-text-area").clear().should("have.value", "");
  });

  it("Selecionar arquivo", function () {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should(function ($input) {
        expect($input[0].files[0]).to.have.property("name", "example.json");
      });
  });

  it("selecionar arquivo simulando drag-an-drop", function () {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should(function ($input) {
        expect($input[0].files[0]).to.have.property("name", "example.json");
      });
  });
  it("selecionar fixture que foi dada um alias", function () {
    cy.fixture("example.json").as("exampleFile");
    cy.get('input[type="file"]')
      .selectFile("@exampleFile")
      .should(function ($input) {
        expect($input[0].files[0]).to.have.property("name", "example.json");
      });
  });
  it("aplicacao q abre outra pagina", function () {
    cy.get("#privacy a")
      .should("have.attr", "target", "_blank")
      .invoke("removeAttr", "target")
      .click();
  });
});

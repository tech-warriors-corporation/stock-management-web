import { Component } from '@angular/core';

import { ButtonLayout } from "../../shared/enums/button-layout";
import { DialogService } from "../dialog/dialog.service";

@Component({
    selector: 'app-support',
    template: `
        <app-dialog primaryTitle="Suporte"
                    secondaryTitle="Como entrar em contato"
                    text='
                        O sistema é mantido voluntariamente por desenvolvedores que estudaram 
                        na FIAP, essa aplicação foi feita com intuito de ajudar o Projeto Casulo, 
                        estamos dispostos a fazer melhorias e corrigir possíveis problemas 
                        encontrados por vocês, se precisarem entrar em contato conosco, enviem 
                        um e-mail para <a href="mailto:joaohotequil@gmail.com">joaohotequil@gmail.com</a> (desenvolvedor full stack e designer) e
                        para <a href="mailto:lucasng2002@gmail.com">lucasng2002@gmail.com</a> (gerente do projeto), com isso, aguardem nossa resposta, obrigado!
                    '>
            <app-button [layout]="buttonLayout.FLAT"
                        (inClick)="close()"
                        dialog-action
                        label="Fechar">
            </app-button>
        </app-dialog>
    `,
})
export class SupportComponent {
    buttonLayout = ButtonLayout

    constructor(private dialogService: DialogService){}

    close(){
        this.dialogService.close()
    }
}

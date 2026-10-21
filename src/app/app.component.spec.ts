import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent (parcours complet du TP-2)', () => {
  let fixture: ComponentFixture<AppComponent>;
  let root: HTMLElement;

  const search = async (value: string) => {
    const input = root.querySelector('input') as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    (root.querySelector('.search__button') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppComponent] }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    root = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('affiche le titre exact « Welcome to my showroom »', () => {
    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Welcome to my showroom');
  });

  it('contient au moins 8 voitures typées dans autoList', () => {
    expect(fixture.componentInstance.autoList.length).toBeGreaterThanOrEqual(8);
  });

  it("affiche l'état initial avant toute recherche", () => {
    expect(root.textContent).toContain('Saisissez une marque');
    expect(root.querySelectorAll('.card').length).toBe(0);
    expect(root.textContent).toContain('Aucune voiture sélectionnée');
  });

  it('demande une marque quand la recherche est vide', async () => {
    await search('   ');
    expect(root.textContent).toContain('Veuillez saisir une marque');
    expect(root.querySelectorAll('.card').length).toBe(0);
  });

  it('filtre par marque sans tenir compte de la casse ni des espaces (*ngFor)', async () => {
    for (const value of ['BMW', 'bmw', ' Bmw ']) {
      await search(value);
      const models = Array.from(root.querySelectorAll('.card__model')).map((e) => e.textContent?.trim());
      expect(models).toEqual(['X2 SDRIVE PACK', 'IX', 'X3 HYBRIDE']);
    }
  });

  it('accepte « mercedes » pour la marque « Mercedes Benz »', async () => {
    await search('mercedes');
    expect(root.querySelectorAll('.card').length).toBe(3);
  });

  it("affiche un message quand aucune voiture ne correspond", async () => {
    await search('Ferrari');
    expect(root.textContent).toContain('Aucun modèle trouvé');
    expect(root.querySelectorAll('.card').length).toBe(0);
  });

  it('View → selectAutoEvent → updateAuto → selectedAuto → *ngIf affiche les détails', async () => {
    await search('audi');
    const buttons = root.querySelectorAll('.card__button');
    expect(buttons.length).toBe(3);

    (buttons[2] as HTMLButtonElement).click(); // A3 SPORTBACK
    fixture.detectChanges();

    const app = fixture.componentInstance;
    expect(app.selectedAuto).not.toBeNull();
    expect(app.selectedAuto?.model).toBe('A3 SPORTBACK');
    expect(root.querySelector('.details__card')).not.toBeNull();
    expect(root.querySelector('.details__list')?.textContent).toContain('A3 SPORTBACK');
    expect(root.querySelector('.details__list')?.textContent).toContain('145,000 DNT');

    (buttons[0] as HTMLButtonElement).click(); // Q3 CROSSBACK : mise à jour automatique
    fixture.detectChanges();
    expect(root.querySelector('.details__list')?.textContent).toContain('Q3 CROSSBACK');
  });
});

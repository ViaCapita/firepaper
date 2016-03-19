export default function(){
  this.transition(
    this.hasClass('sidebar-toggle'),
    this.use('toDown'),
    this.reverse('toUp')
  );

  this.transition(
    this.hasClass('page-toggle'),
    this.toValue(true),
    this.use('scrollThen', 'toUp', { duration: 1000 }),
    this.reverse('scrollThen', 'toUp', { duration: 1000 })
  );


   this.transition(
    this.hasClass('toLeftFromRight'),
    this.toValue(true),
    this.use('toLeft', { duration: 500 }),
    this.reverse('toRight', { duration: 500 })
  );

  this.transition(
    this.fromRoute('home.index'),
    this.toRoute('my.index'),
    this.use('scrollThen', 'revealLeft', { duration: 1000 }),
    this.reverse('scrollThen', 'revealRight', { duration: 1000 })
  );
  this.transition(
    this.fromRoute('home.index'),
    this.toRoute('account.details'),
    this.use('scrollThen', 'revealLeft', { duration: 1000 }),
    this.reverse('scrollThen', 'revealRight', { duration: 1000 })
  );
  this.transition(
    this.fromRoute('my.index'),
    this.toRoute('account.details'),
    this.use('scrollThen', 'revealLeft', { duration: 1000 }),
    this.reverse('scrollThen', 'revealRight', { duration: 1000 })
  );
}


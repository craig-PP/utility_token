drop table project cascade constraints;
drop table project_yield cascade constraints;
drop table wallet cascade constraints;
drop table holdings cascade constraints;
drop table points cascade constraints;
drop table points_log cascade constraints;
-- create tables

create sequence  project_seq;

create table project (
    id               number default on null project_seq.nextval 
                     constraint project_id_pk primary key,
    name             varchar2(255 char),
    contact_email    varchar2(4000 char),
    created          date not null,
    created_by       varchar2(255 char) not null,
    updated          date not null,
    updated_by       varchar2(255 char) not null
);



create sequence  project_yield_seq;

create table project_yield (
    id                 number default on null project_yield_seq.nextval 
                       constraint project_yield_id_pk primary key,
    project_id         number
                       constraint project_yield_project_id_fk
                       references project,
    contract           varchar2(4000 char),
    points_yielded     number,
    yield_frequency    varchar2(4000 char),
    created            date not null,
    created_by         varchar2(255 char) not null,
    updated            date not null,
    updated_by         varchar2(255 char) not null
);

-- table index
create index project_yield_i1 on project_yield (project_id);



create sequence  wallet_seq;

create table wallet (
    id            number default on null wallet_seq.nextval 
                  constraint wallet_id_pk primary key,
    type          varchar2(4000 char),
    address       varchar2(4000 char),
    created       date not null,
    created_by    varchar2(255 char) not null,
    updated       date not null,
    updated_by    varchar2(255 char) not null
);



create sequence  holdings_seq;

create table holdings (
    id                  number default on null holdings_seq.nextval 
                        constraint holdings_id_pk primary key,
    project_yield_id    number
                        constraint holdings_project_yield_id_fk
                        references project_yield,
    wallet              varchar2(4000 char),
    created             date not null,
    created_by          varchar2(255 char) not null,
    updated             date not null,
    updated_by          varchar2(255 char) not null
);

-- table index
create index holdings_i1 on holdings (project_yield_id);



create sequence  points_seq;

create table points (
    id            number default on null points_seq.nextval 
                  constraint points_id_pk primary key,
    wallet_id     number
                  constraint points_wallet_id_fk
                  references wallet,
    project_id    number
                  constraint points_project_id_fk
                  references project,
    points        number,
    created       date not null,
    created_by    varchar2(255 char) not null,
    updated       date not null,
    updated_by    varchar2(255 char) not null
);

-- table index
create index points_i1 on points (wallet_id);

create index points_i2 on points (project_id);



create sequence  points_log_seq;

create table points_log (
    id                        number default on null points_log_seq.nextval 
                              constraint points_log_id_pk primary key,
    points_id                 number
                              constraint points_log_points_id_fk
                              references points,
    old_points                varchar2(4000 char),
    new_points                varchar2(4000 char),
    "Non-default options:"    varchar2(4000 char) default on null 'options',
    created                   date not null,
    created_by                varchar2(255 char) not null,
    updated                   date not null,
    updated_by                varchar2(255 char) not null
);

-- table index
create index points_log_i1 on points_log (points_id);



-- triggers
create or replace trigger project_biu
    before insert or update
    on project
    for each row
begin
    if inserting then
        :new.created := sysdate;
        :new.created_by := coalesce(sys_context('APEX$SESSION','APP_USER'),user);
    end if;
    :new.updated := sysdate;
    :new.updated_by := coalesce(sys_context('APEX$SESSION','APP_USER'),user);
end project_biu;
/


create or replace trigger project_yield_biu
    before insert or update
    on project_yield
    for each row
begin
    if inserting then
        :new.created := sysdate;
        :new.created_by := coalesce(sys_context('APEX$SESSION','APP_USER'),user);
    end if;
    :new.updated := sysdate;
    :new.updated_by := coalesce(sys_context('APEX$SESSION','APP_USER'),user);
end project_yield_biu;
/


create or replace trigger wallet_biu
    before insert or update
    on wallet
    for each row
begin
    if inserting then
        :new.created := sysdate;
        :new.created_by := coalesce(sys_context('APEX$SESSION','APP_USER'),user);
    end if;
    :new.updated := sysdate;
    :new.updated_by := coalesce(sys_context('APEX$SESSION','APP_USER'),user);
end wallet_biu;
/


create or replace trigger holdings_biu
    before insert or update
    on holdings
    for each row
begin
    if inserting then
        :new.created := sysdate;
        :new.created_by := coalesce(sys_context('APEX$SESSION','APP_USER'),user);
    end if;
    :new.updated := sysdate;
    :new.updated_by := coalesce(sys_context('APEX$SESSION','APP_USER'),user);
end holdings_biu;
/


create or replace trigger points_biu before
	insert or update on points
	for each row
begin
	if inserting then
		:new.created    := sysdate;
		:new.created_by := coalesce(
		                           sys_context(
		                                      'APEX$SESSION',
		                                      'APP_USER'
		                           ),
		                           user
		                   );
		insert into points_log (
			id,
			points_id,
			old_points,
			new_points,
			created,
			created_by,
			updated,
			updated_by
		) values (
			points_log_seq.nextval,
			:new.id,
			null,
			:new.points,
			sysdate,
			coalesce(
				sys_context(
					'APEX$SESSION','APP_USER'
				),user
			),
			sysdate,
			coalesce(
				sys_context(
					'APEX$SESSION','APP_USER'
				),user
			)
		);
	end if;
	:new.updated    := sysdate;
	:new.updated_by := coalesce(
	                           sys_context(
	                                      'APEX$SESSION',
	                                      'APP_USER'
	                           ),
	                           user
	                   );
    insert into points_log (
        id,
        points_id,
        old_points,
        new_points,
        created,
        created_by,
        updated,
        updated_by
    ) values (
        points_log_seq.nextval,
        :new.id,
        :old.points,
        :new.points,
        sysdate,
        coalesce(
            sys_context(
                'APEX$SESSION','APP_USER'
            ),user
        ),
        sysdate,
        coalesce(
            sys_context(
                'APEX$SESSION','APP_USER'
            ),user
        )
    );
end points_biu;
/


create or replace trigger points_log_biu
    before insert or update
    on points_log
    for each row
begin
    if inserting then
        :new.created := sysdate;
        :new.created_by := coalesce(sys_context('APEX$SESSION','APP_USER'),user);
    end if;
    :new.updated := sysdate;
    :new.updated_by := coalesce(sys_context('APEX$SESSION','APP_USER'),user);
end points_log_biu;
/
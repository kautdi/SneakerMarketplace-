PGDMP                      |            sneakerMarket    16.2    16.2 ]    [           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            \           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ]           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ^           1262    16554    sneakerMarket    DATABASE     �   CREATE DATABASE "sneakerMarket" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Ukrainian_Ukraine.1251';
    DROP DATABASE "sneakerMarket";
                postgres    false            �            1259    16598    brands    TABLE     ^   CREATE TABLE public.brands (
    idbrand integer NOT NULL,
    name character varying(255)
);
    DROP TABLE public.brands;
       public         heap    postgres    false            �            1259    16597    brands_idbrand_seq    SEQUENCE     �   CREATE SEQUENCE public.brands_idbrand_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.brands_idbrand_seq;
       public          postgres    false    224            _           0    0    brands_idbrand_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.brands_idbrand_seq OWNED BY public.brands.idbrand;
          public          postgres    false    223            �            1259    16591    colors    TABLE     _   CREATE TABLE public.colors (
    idcolor integer NOT NULL,
    color character varying(255)
);
    DROP TABLE public.colors;
       public         heap    postgres    false            �            1259    16590    colors_idcolor_seq    SEQUENCE     �   CREATE SEQUENCE public.colors_idcolor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.colors_idcolor_seq;
       public          postgres    false    222            `           0    0    colors_idcolor_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.colors_idcolor_seq OWNED BY public.colors.idcolor;
          public          postgres    false    221            �            1259    16565    company    TABLE     �   CREATE TABLE public.company (
    idcompany integer NOT NULL,
    name character varying(255),
    description character varying(255),
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
    DROP TABLE public.company;
       public         heap    postgres    false            �            1259    16564    company_idcompany_seq    SEQUENCE     �   CREATE SEQUENCE public.company_idcompany_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.company_idcompany_seq;
       public          postgres    false    218            a           0    0    company_idcompany_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.company_idcompany_seq OWNED BY public.company.idcompany;
          public          postgres    false    217            �            1259    16729    companytoken    TABLE     �   CREATE TABLE public.companytoken (
    idcompanytoken integer NOT NULL,
    idcompany integer NOT NULL,
    access character varying(255) NOT NULL,
    refresh character varying(255) NOT NULL
);
     DROP TABLE public.companytoken;
       public         heap    postgres    false            �            1259    16728    companytoken_idcompanytoken_seq    SEQUENCE     �   CREATE SEQUENCE public.companytoken_idcompanytoken_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.companytoken_idcompanytoken_seq;
       public          postgres    false    236            b           0    0    companytoken_idcompanytoken_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.companytoken_idcompanytoken_seq OWNED BY public.companytoken.idcompanytoken;
          public          postgres    false    235            �            1259    16579    sizes    TABLE     M   CREATE TABLE public.sizes (
    idsize integer NOT NULL,
    size integer
);
    DROP TABLE public.sizes;
       public         heap    postgres    false            �            1259    16578    sizes_idsize_seq    SEQUENCE     �   CREATE SEQUENCE public.sizes_idsize_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.sizes_idsize_seq;
       public          postgres    false    220            c           0    0    sizes_idsize_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.sizes_idsize_seq OWNED BY public.sizes.idsize;
          public          postgres    false    219            �            1259    16638    tovars    TABLE     �   CREATE TABLE public.tovars (
    idtovar integer NOT NULL,
    idcompany integer,
    name character varying(255),
    description character varying(255),
    idbrand integer,
    img character varying(255),
    price numeric(10,2)
);
    DROP TABLE public.tovars;
       public         heap    postgres    false            �            1259    16637    tovars_idtovar_seq    SEQUENCE     �   CREATE SEQUENCE public.tovars_idtovar_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.tovars_idtovar_seq;
       public          postgres    false    228            d           0    0    tovars_idtovar_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.tovars_idtovar_seq OWNED BY public.tovars.idtovar;
          public          postgres    false    227            �            1259    16671    tovarscolor    TABLE     `   CREATE TABLE public.tovarscolor (
    idtovar integer NOT NULL,
    idcolor integer NOT NULL
);
    DROP TABLE public.tovarscolor;
       public         heap    postgres    false            �            1259    16656 
   tovarssize    TABLE     ^   CREATE TABLE public.tovarssize (
    idtovar integer NOT NULL,
    idsize integer NOT NULL
);
    DROP TABLE public.tovarssize;
       public         heap    postgres    false            �            1259    16688    tovarszakaz    TABLE     �   CREATE TABLE public.tovarszakaz (
    idzakaz integer NOT NULL,
    idtovar integer NOT NULL,
    idcolor integer NOT NULL,
    idsize integer NOT NULL
);
    DROP TABLE public.tovarszakaz;
       public         heap    postgres    false            �            1259    16687    tovarszakaz_idzakaz_seq    SEQUENCE     �   CREATE SEQUENCE public.tovarszakaz_idzakaz_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.tovarszakaz_idzakaz_seq;
       public          postgres    false    232            e           0    0    tovarszakaz_idzakaz_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.tovarszakaz_idzakaz_seq OWNED BY public.tovarszakaz.idzakaz;
          public          postgres    false    231            �            1259    16556    users    TABLE     h  CREATE TABLE public.users (
    iduser integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    country character varying(255),
    city character varying(255),
    street character varying(255),
    home character varying(255)
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16555    users_iduser_seq    SEQUENCE     �   CREATE SEQUENCE public.users_iduser_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.users_iduser_seq;
       public          postgres    false    216            f           0    0    users_iduser_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.users_iduser_seq OWNED BY public.users.iduser;
          public          postgres    false    215            �            1259    16715 
   userstoken    TABLE     �   CREATE TABLE public.userstoken (
    idusertoken integer NOT NULL,
    iduser integer NOT NULL,
    access character varying(255) NOT NULL,
    refresh character varying(255) NOT NULL
);
    DROP TABLE public.userstoken;
       public         heap    postgres    false            �            1259    16714    userstoken_idusertoken_seq    SEQUENCE     �   CREATE SEQUENCE public.userstoken_idusertoken_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.userstoken_idusertoken_seq;
       public          postgres    false    234            g           0    0    userstoken_idusertoken_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.userstoken_idusertoken_seq OWNED BY public.userstoken.idusertoken;
          public          postgres    false    233            �            1259    16605    zakaz    TABLE     �   CREATE TABLE public.zakaz (
    idzakaz integer NOT NULL,
    iduser integer,
    country character varying(255),
    city character varying(255),
    street character varying(255),
    home character varying(255),
    status character varying(255)
);
    DROP TABLE public.zakaz;
       public         heap    postgres    false            �            1259    16604    zakaz_idzakaz_seq    SEQUENCE     �   CREATE SEQUENCE public.zakaz_idzakaz_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.zakaz_idzakaz_seq;
       public          postgres    false    226            h           0    0    zakaz_idzakaz_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.zakaz_idzakaz_seq OWNED BY public.zakaz.idzakaz;
          public          postgres    false    225            �           2604    16601    brands idbrand    DEFAULT     p   ALTER TABLE ONLY public.brands ALTER COLUMN idbrand SET DEFAULT nextval('public.brands_idbrand_seq'::regclass);
 =   ALTER TABLE public.brands ALTER COLUMN idbrand DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    16594    colors idcolor    DEFAULT     p   ALTER TABLE ONLY public.colors ALTER COLUMN idcolor SET DEFAULT nextval('public.colors_idcolor_seq'::regclass);
 =   ALTER TABLE public.colors ALTER COLUMN idcolor DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    16568    company idcompany    DEFAULT     v   ALTER TABLE ONLY public.company ALTER COLUMN idcompany SET DEFAULT nextval('public.company_idcompany_seq'::regclass);
 @   ALTER TABLE public.company ALTER COLUMN idcompany DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    16732    companytoken idcompanytoken    DEFAULT     �   ALTER TABLE ONLY public.companytoken ALTER COLUMN idcompanytoken SET DEFAULT nextval('public.companytoken_idcompanytoken_seq'::regclass);
 J   ALTER TABLE public.companytoken ALTER COLUMN idcompanytoken DROP DEFAULT;
       public          postgres    false    235    236    236            �           2604    16582    sizes idsize    DEFAULT     l   ALTER TABLE ONLY public.sizes ALTER COLUMN idsize SET DEFAULT nextval('public.sizes_idsize_seq'::regclass);
 ;   ALTER TABLE public.sizes ALTER COLUMN idsize DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    16641    tovars idtovar    DEFAULT     p   ALTER TABLE ONLY public.tovars ALTER COLUMN idtovar SET DEFAULT nextval('public.tovars_idtovar_seq'::regclass);
 =   ALTER TABLE public.tovars ALTER COLUMN idtovar DROP DEFAULT;
       public          postgres    false    228    227    228            �           2604    16691    tovarszakaz idzakaz    DEFAULT     z   ALTER TABLE ONLY public.tovarszakaz ALTER COLUMN idzakaz SET DEFAULT nextval('public.tovarszakaz_idzakaz_seq'::regclass);
 B   ALTER TABLE public.tovarszakaz ALTER COLUMN idzakaz DROP DEFAULT;
       public          postgres    false    232    231    232            �           2604    16559    users iduser    DEFAULT     l   ALTER TABLE ONLY public.users ALTER COLUMN iduser SET DEFAULT nextval('public.users_iduser_seq'::regclass);
 ;   ALTER TABLE public.users ALTER COLUMN iduser DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    16718    userstoken idusertoken    DEFAULT     �   ALTER TABLE ONLY public.userstoken ALTER COLUMN idusertoken SET DEFAULT nextval('public.userstoken_idusertoken_seq'::regclass);
 E   ALTER TABLE public.userstoken ALTER COLUMN idusertoken DROP DEFAULT;
       public          postgres    false    233    234    234            �           2604    16608    zakaz idzakaz    DEFAULT     n   ALTER TABLE ONLY public.zakaz ALTER COLUMN idzakaz SET DEFAULT nextval('public.zakaz_idzakaz_seq'::regclass);
 <   ALTER TABLE public.zakaz ALTER COLUMN idzakaz DROP DEFAULT;
       public          postgres    false    225    226    226            L          0    16598    brands 
   TABLE DATA           /   COPY public.brands (idbrand, name) FROM stdin;
    public          postgres    false    224   l       J          0    16591    colors 
   TABLE DATA           0   COPY public.colors (idcolor, color) FROM stdin;
    public          postgres    false    222   fl       F          0    16565    company 
   TABLE DATA           P   COPY public.company (idcompany, name, description, email, password) FROM stdin;
    public          postgres    false    218   �l       X          0    16729    companytoken 
   TABLE DATA           R   COPY public.companytoken (idcompanytoken, idcompany, access, refresh) FROM stdin;
    public          postgres    false    236   �n       H          0    16579    sizes 
   TABLE DATA           -   COPY public.sizes (idsize, size) FROM stdin;
    public          postgres    false    220   �o       P          0    16638    tovars 
   TABLE DATA           \   COPY public.tovars (idtovar, idcompany, name, description, idbrand, img, price) FROM stdin;
    public          postgres    false    228   �o       R          0    16671    tovarscolor 
   TABLE DATA           7   COPY public.tovarscolor (idtovar, idcolor) FROM stdin;
    public          postgres    false    230   �q       Q          0    16656 
   tovarssize 
   TABLE DATA           5   COPY public.tovarssize (idtovar, idsize) FROM stdin;
    public          postgres    false    229   �q       T          0    16688    tovarszakaz 
   TABLE DATA           H   COPY public.tovarszakaz (idzakaz, idtovar, idcolor, idsize) FROM stdin;
    public          postgres    false    232   r       D          0    16556    users 
   TABLE DATA           j   COPY public.users (iduser, firstname, lastname, email, password, country, city, street, home) FROM stdin;
    public          postgres    false    216   br       V          0    16715 
   userstoken 
   TABLE DATA           J   COPY public.userstoken (idusertoken, iduser, access, refresh) FROM stdin;
    public          postgres    false    234   �s       N          0    16605    zakaz 
   TABLE DATA           U   COPY public.zakaz (idzakaz, iduser, country, city, street, home, status) FROM stdin;
    public          postgres    false    226   ^t       i           0    0    brands_idbrand_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.brands_idbrand_seq', 12, true);
          public          postgres    false    223            j           0    0    colors_idcolor_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.colors_idcolor_seq', 5, true);
          public          postgres    false    221            k           0    0    company_idcompany_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.company_idcompany_seq', 11, true);
          public          postgres    false    217            l           0    0    companytoken_idcompanytoken_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.companytoken_idcompanytoken_seq', 6, true);
          public          postgres    false    235            m           0    0    sizes_idsize_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.sizes_idsize_seq', 5, true);
          public          postgres    false    219            n           0    0    tovars_idtovar_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.tovars_idtovar_seq', 35, true);
          public          postgres    false    227            o           0    0    tovarszakaz_idzakaz_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.tovarszakaz_idzakaz_seq', 1, false);
          public          postgres    false    231            p           0    0    users_iduser_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_iduser_seq', 13, true);
          public          postgres    false    215            q           0    0    userstoken_idusertoken_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.userstoken_idusertoken_seq', 13, true);
          public          postgres    false    233            r           0    0    zakaz_idzakaz_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.zakaz_idzakaz_seq', 13, true);
          public          postgres    false    225            �           2606    16603    brands brands_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (idbrand);
 <   ALTER TABLE ONLY public.brands DROP CONSTRAINT brands_pkey;
       public            postgres    false    224            �           2606    16596    colors colors_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_pkey PRIMARY KEY (idcolor);
 <   ALTER TABLE ONLY public.colors DROP CONSTRAINT colors_pkey;
       public            postgres    false    222            �           2606    16572    company company_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (idcompany);
 >   ALTER TABLE ONLY public.company DROP CONSTRAINT company_pkey;
       public            postgres    false    218            �           2606    16736    companytoken companytoken_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.companytoken
    ADD CONSTRAINT companytoken_pkey PRIMARY KEY (idcompanytoken);
 H   ALTER TABLE ONLY public.companytoken DROP CONSTRAINT companytoken_pkey;
       public            postgres    false    236            �           2606    16584    sizes sizes_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.sizes
    ADD CONSTRAINT sizes_pkey PRIMARY KEY (idsize);
 :   ALTER TABLE ONLY public.sizes DROP CONSTRAINT sizes_pkey;
       public            postgres    false    220            �           2606    16645    tovars tovars_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.tovars
    ADD CONSTRAINT tovars_pkey PRIMARY KEY (idtovar);
 <   ALTER TABLE ONLY public.tovars DROP CONSTRAINT tovars_pkey;
       public            postgres    false    228            �           2606    16675    tovarscolor tovarscolor_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.tovarscolor
    ADD CONSTRAINT tovarscolor_pkey PRIMARY KEY (idtovar, idcolor);
 F   ALTER TABLE ONLY public.tovarscolor DROP CONSTRAINT tovarscolor_pkey;
       public            postgres    false    230    230            �           2606    16660    tovarssize tovarssize_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.tovarssize
    ADD CONSTRAINT tovarssize_pkey PRIMARY KEY (idtovar, idsize);
 D   ALTER TABLE ONLY public.tovarssize DROP CONSTRAINT tovarssize_pkey;
       public            postgres    false    229    229            �           2606    16693    tovarszakaz tovarszakaz_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public.tovarszakaz
    ADD CONSTRAINT tovarszakaz_pkey PRIMARY KEY (idzakaz, idtovar, idcolor, idsize);
 F   ALTER TABLE ONLY public.tovarszakaz DROP CONSTRAINT tovarszakaz_pkey;
       public            postgres    false    232    232    232    232            �           2606    16563    users users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (iduser);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            �           2606    16722    userstoken userstoken_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.userstoken
    ADD CONSTRAINT userstoken_pkey PRIMARY KEY (idusertoken);
 D   ALTER TABLE ONLY public.userstoken DROP CONSTRAINT userstoken_pkey;
       public            postgres    false    234            �           2606    16612    zakaz zakaz_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.zakaz
    ADD CONSTRAINT zakaz_pkey PRIMARY KEY (idzakaz);
 :   ALTER TABLE ONLY public.zakaz DROP CONSTRAINT zakaz_pkey;
       public            postgres    false    226            �           2606    16737 (   companytoken companytoken_idcompany_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.companytoken
    ADD CONSTRAINT companytoken_idcompany_fkey FOREIGN KEY (idcompany) REFERENCES public.company(idcompany);
 R   ALTER TABLE ONLY public.companytoken DROP CONSTRAINT companytoken_idcompany_fkey;
       public          postgres    false    4754    236    218            �           2606    16651    tovars tovars_idbrand_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.tovars
    ADD CONSTRAINT tovars_idbrand_fkey FOREIGN KEY (idbrand) REFERENCES public.brands(idbrand);
 D   ALTER TABLE ONLY public.tovars DROP CONSTRAINT tovars_idbrand_fkey;
       public          postgres    false    224    4760    228            �           2606    16646    tovars tovars_idcompany_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tovars
    ADD CONSTRAINT tovars_idcompany_fkey FOREIGN KEY (idcompany) REFERENCES public.company(idcompany);
 F   ALTER TABLE ONLY public.tovars DROP CONSTRAINT tovars_idcompany_fkey;
       public          postgres    false    4754    218    228            �           2606    16681 $   tovarscolor tovarscolor_idcolor_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tovarscolor
    ADD CONSTRAINT tovarscolor_idcolor_fkey FOREIGN KEY (idcolor) REFERENCES public.colors(idcolor);
 N   ALTER TABLE ONLY public.tovarscolor DROP CONSTRAINT tovarscolor_idcolor_fkey;
       public          postgres    false    230    222    4758            �           2606    16676 $   tovarscolor tovarscolor_idtovar_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tovarscolor
    ADD CONSTRAINT tovarscolor_idtovar_fkey FOREIGN KEY (idtovar) REFERENCES public.tovars(idtovar);
 N   ALTER TABLE ONLY public.tovarscolor DROP CONSTRAINT tovarscolor_idtovar_fkey;
       public          postgres    false    4764    230    228            �           2606    16666 !   tovarssize tovarssize_idsize_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tovarssize
    ADD CONSTRAINT tovarssize_idsize_fkey FOREIGN KEY (idsize) REFERENCES public.sizes(idsize);
 K   ALTER TABLE ONLY public.tovarssize DROP CONSTRAINT tovarssize_idsize_fkey;
       public          postgres    false    229    220    4756            �           2606    16661 "   tovarssize tovarssize_idtovar_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tovarssize
    ADD CONSTRAINT tovarssize_idtovar_fkey FOREIGN KEY (idtovar) REFERENCES public.tovars(idtovar);
 L   ALTER TABLE ONLY public.tovarssize DROP CONSTRAINT tovarssize_idtovar_fkey;
       public          postgres    false    4764    229    228            �           2606    16704 $   tovarszakaz tovarszakaz_idcolor_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tovarszakaz
    ADD CONSTRAINT tovarszakaz_idcolor_fkey FOREIGN KEY (idcolor) REFERENCES public.colors(idcolor);
 N   ALTER TABLE ONLY public.tovarszakaz DROP CONSTRAINT tovarszakaz_idcolor_fkey;
       public          postgres    false    232    222    4758            �           2606    16709 #   tovarszakaz tovarszakaz_idsize_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tovarszakaz
    ADD CONSTRAINT tovarszakaz_idsize_fkey FOREIGN KEY (idsize) REFERENCES public.sizes(idsize);
 M   ALTER TABLE ONLY public.tovarszakaz DROP CONSTRAINT tovarszakaz_idsize_fkey;
       public          postgres    false    232    220    4756            �           2606    16699 $   tovarszakaz tovarszakaz_idtovar_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tovarszakaz
    ADD CONSTRAINT tovarszakaz_idtovar_fkey FOREIGN KEY (idtovar) REFERENCES public.tovars(idtovar);
 N   ALTER TABLE ONLY public.tovarszakaz DROP CONSTRAINT tovarszakaz_idtovar_fkey;
       public          postgres    false    4764    228    232            �           2606    16694 $   tovarszakaz tovarszakaz_idzakaz_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tovarszakaz
    ADD CONSTRAINT tovarszakaz_idzakaz_fkey FOREIGN KEY (idzakaz) REFERENCES public.zakaz(idzakaz);
 N   ALTER TABLE ONLY public.tovarszakaz DROP CONSTRAINT tovarszakaz_idzakaz_fkey;
       public          postgres    false    226    232    4762            �           2606    16723 !   userstoken userstoken_iduser_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.userstoken
    ADD CONSTRAINT userstoken_iduser_fkey FOREIGN KEY (iduser) REFERENCES public.users(iduser);
 K   ALTER TABLE ONLY public.userstoken DROP CONSTRAINT userstoken_iduser_fkey;
       public          postgres    false    216    4752    234            �           2606    16613    zakaz zakaz_iduser_fkey    FK CONSTRAINT     y   ALTER TABLE ONLY public.zakaz
    ADD CONSTRAINT zakaz_iduser_fkey FOREIGN KEY (iduser) REFERENCES public.users(iduser);
 A   ALTER TABLE ONLY public.zakaz DROP CONSTRAINT zakaz_iduser_fkey;
       public          postgres    false    4752    216    226            L   >   x�3����N�2�tL�LI,�2��K-WpJ�I�KN�2�t,�L.�2�(�M�24������ ��      J   a   x�%�;
�0D���/�a���
XV�"�$w���M,��ϛRxP��gzT�7�Z��a0y4���E+\�9�9E'�R`���+�Х3��> >G-C      F   �  x�]�OS�0����!gc;!4�쐔R�q�)�E��dǲ������Ei��hv�����>�hu}���d}c�q��)�akB�UL!R�%�I{�,��u�L��=㵔�cD���(oLc��#g(&�hK�Gk�o�pN�.��9(.#S�%�ڡ��F1QX��Z*lUI��>����iwd0Ch��\�(�k�&���qxej𬿧�Y@�ry��h�L/�C/�-�����o�����>q�((�q��ƝT��b��g�8¸�u�e�1z�>>�>1$K�1��h���8��W_�P�����"M�|]��)j6����-��Yݧ4�!�<��`�6� �ME۱��7;�_����U�SgI~}��g�,��8�����v�e�|�}��m�����0��3ʗ      X   !  x���;s�@��Z�K�E.b	,����6�F���1vi3�{�g�6���o���*�|�(��z��c�8�T~DG��*�]�D1�������(h�0&3$+˹-/g)+�ܝ��*ޛ��v�n�$��=q�u� [�b�4��:O����grnjC�d�t�x�!��V~hj�I�HQ��`�cj��7���
�Qɽ�b�YAfl�������?�p��i=������ �;��'���Қ��mh\K�ק���>\�Y�#s���7��\��%I�fҪY      H   0   x��� C�s~1�^�_��!S�X>D�,�S�`+�����׀��      P   �  x�ŒAo�0���_1�� �ew�JQĮ�[��Un��cp6������J�@OH�����`g��?
��Y��3g�Ni�N�:�Y�vu��Zm�6��~��I�*Sk]�be���ZwH�H��!O�\����jT��]�n]%M$��Αm""��)"e��l�'�D<��qz��9ˏ<;}�u��q�8K9�1�=۳oc/��h���Gk��E.-ܦѢAm���V�����t�$tZ���\���аlcd,c/8�Ev�(�'���=��Iv�/���ny��儏/\�s�vO,�%��C�
>l�C�E��tM�)��y�٫��A�z;:���Ї��������6.�R��R��J�����FL�M��$�k2ެ%�G�\m=���<����67��߳�o=~ƻ��7��9      R   -   x���	 0��o�B�d��?GM��ѰZ:F΋��s�� ���      Q   +   x��� 0��w<L%l��s4��-3V��Ҧb�;v�|}�c      T   A   x�=̱� C�Z�C6\�]���æ��+< �yk{����~��	�zB����J<��8�7���      D     x�U��N�@���Sx�Z
�Tobi���!Z��v!�,���'M/�L�|��)I�Q_��$��23�.�EA����5l��&�|T�����5�B3��Mf�h��]GTd��zm���j.��0���1�Z����`?�%Nr��'!!�~'�'n��㹞�z�Q�	
2��i��lj7�G���?���tlJ�,�����t=��u�������p�1M2d��(�2�S�Y	c�����(mEaˈBﰂe�T�/`[�/a�����E����i½$�/�Y~�      V   �   x���ݎ�0��]$T/+���mDc�a��Z�6���y�&'s�Ah���4Ɨ�LĐ@T@���� uY��~J�ϊq�K�F�:���|�K�ܡ!�,����u$h�:�D�v쵔�~
����S~���5\�?��5rf�颩�.���?�Bl��;�����Q�l��=�%��P��J�-SQ~/ïV�u�-�z #9a�      N   g   x�3�4�*-.�L�t�,��.)JM-����M�t��-�I-I�2ţ�%5'�,���˂�А3)=-=)-�L&�Qp���+54 A�!	j��WkN���ī����� Ⱥ{&     
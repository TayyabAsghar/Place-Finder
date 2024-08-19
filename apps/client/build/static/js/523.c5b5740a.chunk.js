"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[523],{3017:(e,i,s)=>{s.d(i,{EH:()=>j,Md:()=>u,Or:()=>b,o3:()=>g});var a=s(93536),t=s(27825),r=s(62312),l=s(44123),n=s(94351),o=s(84255),m=s(62457),c=s(3498),d=s(67449),x=s(72661),p=s(90076);const h="assets/images/categories",u=[{label:"All",icon:(0,p.jsx)(x.M$I,{}),img:`${h}/world.webp`},{label:"Beachfront",icon:(0,p.jsx)(r.Spb,{}),img:`${h}/beach.webp`,description:"This property is close to the beach!"},{label:"Windmills",icon:(0,p.jsx)(c.xyA,{}),img:`${h}/windmill.webp`,description:"This property is has windmills!"},{label:"Iconic Cities",icon:(0,p.jsx)(m.YkR,{}),img:`${h}/modern.webp`,description:"This property is modern!"},{label:"Countryside",icon:(0,p.jsx)(r.Ilj,{}),img:`${h}/countryside.webp`,description:"This property is in the countryside!"},{label:"Amazing Pools",icon:(0,p.jsx)(r.BCN,{}),img:`${h}/pool.webp`,description:"This is property has a beautiful pool!"},{label:"Islands",icon:(0,p.jsx)(c.KCD,{}),img:`${h}/island.webp`,description:"This property is on an island!"},{label:"Lakefront",icon:(0,p.jsx)(c.Rt1,{}),img:`${h}/lake.webp`,description:"This property is near a lake!"},{label:"Ski-in/out",icon:(0,p.jsx)(d.TEo,{}),img:`${h}/skiing.webp`,description:"This property has skiing activities!"},{label:"Castles",icon:(0,p.jsx)(c.Fgb,{}),img:`${h}/castle.webp`,description:"This property is an ancient castle!"},{label:"Caves",icon:(0,p.jsx)(c.Otl,{}),img:`${h}/cave.webp`,description:"This property is in a spooky cave!"},{label:"Camping",icon:(0,p.jsx)(c.Jkk,{}),img:`${h}/camping.webp`,description:"This property offers camping activities!"},{label:"Arctic",icon:(0,p.jsx)(n.NqY,{}),img:`${h}/arctic.webp`,description:"This property is in arctic environment!"},{label:"Desert",icon:(0,p.jsx)(c.o6o,{}),img:`${h}/desert.webp`,description:"This property is in the desert!"},{label:"Barns",icon:(0,p.jsx)(c.YpR,{}),img:`${h}/barn.webp`,description:"This property is in a barn!"},{label:"Luxury",icon:(0,p.jsx)(t.r0o,{}),img:`${h}/lux.webp`,description:"This property is brand new and luxurious!"}],g=u.map((e=>e.label.toLowerCase())),b=[{name:"An entire place",icon:(0,p.jsx)(l.zwj,{}),description:"Guests have the whole place to themselves"},{name:"Room(s)",icon:(0,p.jsx)(n._pp,{}),description:"Guests have their own room in a house, plus access to shared places"},{name:"A Shared Room",icon:(0,p.jsx)(l.F0k,{}),description:"Guests sleep in a room or common area that maybe shared with you or others"}],j=[{name:"Bath tub",icon:(0,p.jsx)(o.nyr,{})},{name:"Hygiene products",icon:(0,p.jsx)(d.LhV,{})},{name:"Outdoor shower",icon:(0,p.jsx)(d.EWM,{})},{name:"Washer",icon:(0,p.jsx)(x.r8h,{})},{name:"Dryer",icon:(0,p.jsx)(x.N3O,{})},{name:"Hangers",icon:(0,p.jsx)(o.Z9A,{})},{name:"Iron",icon:(0,p.jsx)(r.OKx,{})},{name:"TV",icon:(0,p.jsx)(o.BxF,{})},{name:"Dedicated workspace",icon:(0,p.jsx)(n.eCE,{})},{name:"Air Conditioning",icon:(0,p.jsx)(n.NqY,{})},{name:"Heating",icon:(0,p.jsx)(c.Pd2,{})},{name:"Security cameras",icon:(0,p.jsx)(c.YIS,{})},{name:"Fire extinguisher",icon:(0,p.jsx)(d.LMH,{})},{name:"First Aid",icon:(0,p.jsx)(x.z6T,{})},{name:"Wifi",icon:(0,p.jsx)(x.tOX,{})},{name:"Cooking set",icon:(0,p.jsx)(l.Elu,{})},{name:"Refrigerator",icon:(0,p.jsx)(x.smP,{})},{name:"Microwave",icon:(0,p.jsx)(m.Ljd,{})},{name:"Stove",icon:(0,p.jsx)(c.Btf,{})},{name:"Barbecue grill",icon:(0,p.jsx)(c.EKh,{})},{name:"Outdoor dining area",icon:(0,p.jsx)(d.PAB,{})},{name:"Private patio or Balcony",icon:(0,p.jsx)(m.mKf,{})},{name:"Camp fire",icon:(0,p.jsx)(c.oBx,{})},{name:"Garden",icon:(0,p.jsx)(m.uit,{})},{name:"Free parking",icon:(0,p.jsx)(a.UpI,{})},{name:"Self check-in",icon:(0,p.jsx)(d.pXu,{})},{name:"Pet allowed",icon:(0,p.jsx)(m.Uib,{})}]},9523:(e,i,s)=>{s.r(i),s.d(i,{default:()=>z});var a=s(85045),t=s(72661),r=s(92563),l=s(35935),n=s(69646),o=s(20796),m=s(8401),c=s(93430),d=s(13403),x=s(50016),p=s(45037),h=s(18937),u=s(4143),g=s(3017),b=s(58579),j=s(8602),y=s(7358);const f=y.z.object({creatorId:y.z.string().trim().min(1,{message:"Required field."}),category:y.z.string().trim().min(1,{message:"Required field."}),type:y.z.string().trim().min(1,{message:"Required field."}),streetAddress:y.z.string().trim().min(1,{message:"Required field."}),aptSuite:y.z.string().trim().min(1,{message:"Required field."}),city:y.z.string().trim().min(1,{message:"Required field."}),province:y.z.string().trim().min(1,{message:"Required field."}),country:y.z.string().trim().min(1,{message:"Required field."}),guestCount:y.z.number().min(1),bedroomCount:y.z.number().min(1),bedCount:y.z.number().min(1),bathroomCount:y.z.number().min(1),amenities:y.z.string().array().nonempty("Select at least 1 option."),listingPhotos:y.z.custom().refine((e=>0!==(null===e||void 0===e?void 0:e.length)),"Image is required").refine((e=>Array.from(e||[]).every((e=>h.GP.includes(e.type)))),"Only .jpeg, .jpg, webp and .png are accepted.").refine((e=>Array.from(e||[]).reduce(((e,i)=>e+i.size),0)<h.w0),`Image/s total size should be smaller than ${h.w0/2**20} Mb's.`).refine((async e=>{var i;const s=null===(i=Array.from(e||[]))||void 0===i?void 0:i.map((async e=>{const i=await createImageBitmap(e),{width:s,height:a}=i;return!(s<400||a<400)})),a=await Promise.all(s);return null===a||void 0===a?void 0:a.every((e=>e))}),"All images should be more than 400 X 400 Dimensions."),title:y.z.string().trim().min(1,{message:"Listing Photos are required."}).max(30,{message:"Maximum 30 characters."}),description:y.z.string().trim().min(1,{message:"Required field."}).max(400,{message:"Maximum 400 characters."}),highlight:y.z.string().trim().min(1,{message:"Required field."}).max(50,{message:"Maximum 50 characters."}),highlightDesc:y.z.string().trim().min(1,{message:"Required field."}).max(400,{message:"Maximum 400 characters."}),price:y.z.coerce.number().min(1,{message:"Required field."})});var v=s(69575),N=s(64459),w=s(65695),C=s(37563),A=s(18781),S=s(90076);const z=()=>{var e,i,s,y,z,k,T,P,$,R,O,q;const D=(0,v.A)(),I=(0,r.A)(),B=(0,d.Zp)(),{setNotification:M}=(0,u.A)(),[H,E]=(0,x.useState)([]),L=(0,N.A)(D.breakpoints.down("ml")),F=(0,n.d4)((e=>{var i;return(null===(i=e.user)||void 0===i?void 0:i._id)||""})),{register:W,handleSubmit:Y,getValues:G,setValue:U,trigger:V,formState:{errors:K,isSubmitting:X}}=(0,l.mN)({resolver:(0,p.u)(f),defaultValues:{type:"",price:0,bedCount:1,category:"",amenities:[],guestCount:1,bedroomCount:1,bathroomCount:1,creatorId:F}}),_=(e,i)=>{U(e,i),V(e)},Z=e=>{U(e,Number(G(e))-1),V(e)},J=e=>{U(e,Number(G(e))+1),V(e)},Q=e=>{E(e),U("listingPhotos",e),V("listingPhotos")};return(0,S.jsxs)("div",{className:"px-14 pt-10 pb-20 max-ml:pt-6 max-ml:pb-12 max-mm:py-4 max-mm:px-4 max-ms:px-2",children:[(0,S.jsx)("h1",{children:"Publish Your Place"}),(0,S.jsxs)("form",{className:"flex flex-col items-center",onSubmit:Y((async e=>{try{const i=new FormData;i.append("type",e.type),i.append("category",e.category),i.append("creatorId",e.creatorId),i.append("city",(0,o.Sn)(e.city)),i.append("price",e.price.toString()),i.append("description",e.description),i.append("title",(0,o.Sn)(e.title)),i.append("highlightDesc",e.highlightDesc),i.append("country",(0,o.Sn)(e.country)),i.append("bedCount",e.bedCount.toString()),i.append("aptSuite",(0,o.Sn)(e.aptSuite)),i.append("province",(0,o.Sn)(e.province)),i.append("guestCount",e.guestCount.toString()),i.append("highlight",(0,o.Sn)(e.highlight)),i.append("bedroomCount",e.bedroomCount.toString()),i.append("bathroomCount",e.bathroomCount.toString()),i.append("streetAddress",(0,o.Sn)(e.streetAddress)),e.listingPhotos.forEach((e=>i.append("listingPhotos",e))),Array.from(e.amenities).forEach((e=>i.append("amenities",e)));const s=await I.post("/listing/create",i,"form");s.data.errorFiles.length&&M({message:"1 or more images faced some issues while uploading.",severity:"error"}),B(`/listing/${s.data.listing._id}`)}catch(i){i&&i instanceof m.A&&M({message:i.message,severity:"error"})}})),children:[(0,S.jsxs)("div",{className:"bg-secondary-100 bg-opacity-25 mt-10 rounded-2xl px-10 py-7 max-ml:mt-5 max-ml:px-6 max-ml:py-5",children:[(0,S.jsx)("h2",{className:"text-accent",children:"Step 1: Tell us about your place"}),(0,S.jsx)("hr",{className:"mx-0 my-4 max-ml:my-3"}),(0,S.jsx)("h3",{className:"create-listing-heading",children:"Which of one these categories best describes your place?"}),(0,S.jsx)("div",{className:"flex justify-center items-center flex-wrap gap-5 px-5 py-0",...W("category"),children:null===g.Md||void 0===g.Md?void 0:g.Md.slice(1).map(((e,i)=>(0,S.jsxs)("div",{className:`create-listing-categories ${G("category")===e.label?"create-listing-selected":""}\n                                ${K.category?"!border-error":""}`,onClick:()=>_("category",e.label),children:[(0,S.jsx)("div",{className:"text-3xl max-ml:text-2xl",children:e.icon}),(0,S.jsx)("p",{className:"font-semibold text-center max-ml:font-medium max-mm:text-sm",children:e.label})]},i)))}),(0,S.jsx)("h3",{className:"create-listing-heading",children:"What type of place will guests have?"}),(0,S.jsx)("div",{className:"flex justify-around gap-y-5 flex-wrap",...W("type"),children:null===g.Or||void 0===g.Or?void 0:g.Or.map(((e,i)=>(0,S.jsxs)("div",{className:`create-listing-types ${G("type")===e.name?"create-listing-selected":""}\n                                ${K.type?"!border-error":""}`,onClick:()=>_("type",e.name),children:[(0,S.jsxs)("div",{className:"max-w-[400px] flex flex-col max-ml:h-full max-ml:justify-evenly max-ml:w-full",children:[(0,S.jsxs)("div",{className:"flex justify-between",children:[(0,S.jsx)("h4",{className:"mb-1 font-semibold text-lg max-ml:text-base",children:e.name}),(0,S.jsx)("div",{className:"text-3xl ml:hidden",children:e.icon})]}),(0,S.jsx)("p",{className:"max-ml:text-sm",children:e.description})]}),(0,S.jsx)("div",{className:"text-3xl max-ml:hidden",children:e.icon})]},i)))}),(0,S.jsx)("h3",{className:"create-listing-heading !mb-0",children:"Where's your place located?"}),(0,S.jsx)("div",{className:"max-w-[700px]",children:(0,S.jsx)(w.A,{size:""+(L?"small":"medium"),className:"w-full",label:"Street Address",title:"Street Address",type:"text",margin:"normal",...W("streetAddress"),error:!!K.streetAddress,helperText:null===(e=K.streetAddress)||void 0===e?void 0:e.message})}),(0,S.jsxs)("div",{className:"max-w-[700px] flex gap-x-10 max-ml:flex-wrap",children:[(0,S.jsx)(w.A,{size:""+(L?"small":"medium"),className:"w-full",label:"Apt, Suite, etc.",title:"Apt, Suite, etc.",type:"text",margin:"normal",...W("aptSuite"),error:!!K.aptSuite,helperText:null===(i=K.aptSuite)||void 0===i?void 0:i.message}),(0,S.jsx)(w.A,{size:""+(L?"small":"medium"),className:"w-full",label:"City",title:"City",type:"text",margin:"normal",...W("city"),error:!!K.city,helperText:null===(s=K.city)||void 0===s?void 0:s.message})]}),(0,S.jsxs)("div",{className:"max-w-[700px] flex gap-x-10 max-ml:flex-wrap",children:[(0,S.jsx)(w.A,{size:""+(L?"small":"medium"),className:"w-full",label:"Province",title:"Province",type:"text",margin:"normal",...W("province"),error:!!K.province,helperText:null===(y=K.province)||void 0===y?void 0:y.message}),(0,S.jsx)(w.A,{size:""+(L?"small":"medium"),className:"w-full",label:"Country",title:"Country",type:"text",margin:"normal",...W("country"),error:!!K.country,helperText:null===(z=K.country)||void 0===z?void 0:z.message})]}),(0,S.jsx)("h3",{className:"create-listing-heading",children:"Share some basics about your place"}),(0,S.jsxs)("div",{className:"flex flex-wrap gap-x-10 gap-y-5 max-tab:justify-between",children:[(0,S.jsxs)("div",{className:"counter-buttons",children:[(0,S.jsx)("p",{className:"font-semibold",children:"Guests"}),(0,S.jsxs)("div",{className:"flex items-center gap-2 text-xl",children:[(0,S.jsx)(C.A,{"aria-label":"remove guests",color:"primary",disabled:1===G("guestCount"),onClick:()=>Z("guestCount"),children:(0,S.jsx)(b.A,{})}),(0,S.jsx)("input",{className:"max-w-6 bg-transparent focus-visible:outline-none",readOnly:!0,...W("guestCount")}),(0,S.jsx)(C.A,{"aria-label":"add guests",color:"primary",onClick:()=>J("guestCount"),children:(0,S.jsx)(j.A,{})})]})]}),(0,S.jsxs)("div",{className:"counter-buttons",children:[(0,S.jsx)("p",{className:"font-semibold",children:"Bedrooms"}),(0,S.jsxs)("div",{className:"flex items-center gap-2 text-xl",children:[(0,S.jsx)(C.A,{"aria-label":"remove bedroom",color:"primary",disabled:1===G("bedroomCount"),onClick:()=>Z("bedroomCount"),children:(0,S.jsx)(b.A,{})}),(0,S.jsx)("input",{className:"max-w-6 bg-transparent focus-visible:outline-none",readOnly:!0,...W("bedroomCount")}),(0,S.jsx)(C.A,{"aria-label":"add bedroom",color:"primary",onClick:()=>J("bedroomCount"),children:(0,S.jsx)(j.A,{})})]})]}),(0,S.jsxs)("div",{className:"counter-buttons",children:[(0,S.jsx)("p",{className:"font-semibold",children:"Beds"}),(0,S.jsxs)("div",{className:"flex items-center gap-2 text-xl",children:[(0,S.jsx)(C.A,{"aria-label":"remove bed",color:"primary",disabled:1===G("bedCount"),onClick:()=>Z("bedCount"),children:(0,S.jsx)(b.A,{})}),(0,S.jsx)("input",{className:"max-w-6 bg-transparent focus-visible:outline-none",readOnly:!0,...W("bedCount")}),(0,S.jsx)(C.A,{"aria-label":"add bed",color:"primary",onClick:()=>J("bedCount"),children:(0,S.jsx)(j.A,{})})]})]}),(0,S.jsxs)("div",{className:"counter-buttons",children:[(0,S.jsx)("p",{className:"font-semibold",children:"Bathrooms"}),(0,S.jsxs)("div",{className:"flex items-center gap-2 text-xl",children:[(0,S.jsx)(C.A,{"aria-label":"remove bathroom",color:"primary",disabled:1===G("bathroomCount"),onClick:()=>Z("bathroomCount"),children:(0,S.jsx)(b.A,{})}),(0,S.jsx)("input",{className:"max-w-6 bg-transparent focus-visible:outline-none",readOnly:!0,...W("bathroomCount")}),(0,S.jsx)(C.A,{"aria-label":"add bathroom",color:"primary",onClick:()=>J("bathroomCount"),children:(0,S.jsx)(j.A,{})})]})]})]})]}),(0,S.jsxs)("div",{className:"bg-secondary-100 bg-opacity-25 mt-10 rounded-2xl px-10 py-7 max-ml:mt-5 max-ml:px-6 max-ml:py-5",children:[(0,S.jsx)("h2",{children:"Step 2: Make your place stand out"}),(0,S.jsx)("hr",{className:"mx-0 my-4 max-ml:my-3"}),(0,S.jsx)("h3",{className:"create-listing-heading",children:"Tell guests what your place has to offer"}),(0,S.jsx)("div",{className:"flex justify-center flex-wrap gap-5",children:null===g.EH||void 0===g.EH?void 0:g.EH.map(((e,i)=>{var s;return(0,S.jsxs)("div",{className:`create-listing-facilities ${null!==(s=G("amenities"))&&void 0!==s&&s.includes(e.name)?"create-listing-selected":""}\n                                ${K.amenities?"!border-error":""}`,onClick:()=>(e=>{let i=G("amenities");const s=i.indexOf(e);s>-1?i.splice(s,1):i=[e,...Array.from(i)],U("amenities",i),V("amenities")})(e.name),children:[(0,S.jsx)("div",{className:"text-3xl max-ml:text-2xl max-ms:text-xl",children:e.icon}),(0,S.jsx)("p",{className:"font-semibold max-ml:font-normal max-mm:text-sm",children:e.name})]},i)}))}),!!K.amenities&&(0,S.jsx)("div",{className:"error-message",children:null===(k=K.amenities)||void 0===k?void 0:k.message}),(0,S.jsx)("h3",{className:"create-listing-heading",children:"Add some photos of your place"}),(0,S.jsxs)("div",{className:"flex flex-col flex-wrap gap-4",children:[H.length>=1&&(0,S.jsx)("div",{className:"flex flex-wrap gap-4 max-ml:justify-center",children:H.map(((e,i)=>(0,S.jsxs)("div",{className:"max-w-64 max-h-44 max-ml:h-36 max-ml:w-60 relative",children:[(0,S.jsx)("img",{className:"w-full h-full object-contain",alt:"place",src:URL.createObjectURL(e)}),(0,S.jsx)("div",{className:"absolute top-0 right-0 bg-accent-100",children:(0,S.jsx)(C.A,{className:"!p-0 !text-primary hover:!text-error",type:"button",onClick:()=>(e=>{if(H){const i=H.filter(((i,s)=>s!==e));Q(i)}})(i),children:(0,S.jsx)(t.id1,{})})})]},i)))}),(0,S.jsxs)("div",{className:"flex-col items-center justify-center max-ml:flex",...W("listingPhotos"),children:[(0,S.jsx)("input",{id:"image",type:"file",style:{display:"none"},onChange:e=>{const i=e.target.files;if(i){const e=[...H,...Array.from(i)];Q(e)}},accept:h.GP.join(","),multiple:!0}),(0,S.jsxs)("label",{className:"flex flex-col gap-3 w-72 h-44 items-center px-12 py-8 rounded-md border border-dashed cursor-pointer hover:border-foreground max-ml:h-36 max-ml:w-60\n                                    "+(K.listingPhotos?"border-error hover:border-error":""),htmlFor:"image",children:[(0,S.jsx)(c.YRP,{className:"text-6xl"}),(0,S.jsx)("p",{className:"font-semibold text-center max-ml:font-normal max-ml:text-sm",children:"Upload from your device"})]}),!!K.listingPhotos&&(0,S.jsx)("div",{className:"error-message",children:null===(T=K.listingPhotos)||void 0===T?void 0:T.message})]})]}),(0,S.jsx)("h3",{className:"create-listing-heading",children:"What make your place attractive and exciting?"}),(0,S.jsxs)("div",{className:"max-w-[700px]",children:[(0,S.jsx)(w.A,{size:""+(L?"small":"medium"),className:"w-full",label:"Title",title:"Title",type:"text",margin:"normal",...W("title"),error:!!K.title,helperText:null===(P=K.title)||void 0===P?void 0:P.message}),(0,S.jsx)(w.A,{size:""+(L?"small":"medium"),className:"w-full",label:"Description",title:"Description",margin:"normal",multiline:!0,maxRows:5,...W("description"),error:!!K.description,helperText:null===($=K.description)||void 0===$?void 0:$.message}),(0,S.jsx)(w.A,{size:""+(L?"small":"medium"),className:"w-full",label:"Highlight",title:"Highlight",margin:"normal",...W("highlight"),error:!!K.highlight,helperText:null===(R=K.highlight)||void 0===R?void 0:R.message}),(0,S.jsx)(w.A,{size:""+(L?"small":"medium"),className:"w-full",label:"Highlight Details",title:"Highlight Details",margin:"normal",multiline:!0,maxRows:5,...W("highlightDesc"),error:!!K.highlightDesc,helperText:null===(O=K.highlightDesc)||void 0===O?void 0:O.message}),(0,S.jsx)(w.A,{size:""+(L?"small":"medium"),className:"w-1/2",label:"Price",title:"Price",type:"number",margin:"normal",InputProps:{inputProps:{min:0},startAdornment:(0,S.jsx)(A.A,{position:"start",children:"$"})},...W("price"),error:!!K.price,helperText:null===(q=K.price)||void 0===q?void 0:q.message})]})]}),(0,S.jsx)(a.A,{className:"w-3/4 !mt-16 max-mm:!my-10",sx:{mt:2},type:"submit",variant:"contained",loading:X,title:"Create Listing",children:"Create Your Listing"})]})]})}}}]);
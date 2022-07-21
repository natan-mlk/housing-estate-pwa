import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { RestService } from '../../common.module';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RestService } from '../../services/rest.service';
import { Subscription } from 'rxjs';
import { CommentDialogInterface } from '../post-page/post-page.component';


@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit, OnDestroy {

  commentFormGroup = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(3)]),
    user: new FormControl(''),
  })
  isSendCommentButtonDisabled: boolean = true;
  formStatusSubscription: Subscription = Subscription.EMPTY;
  isLoaderVisible: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommentDialogInterface,
    private restService: RestService
  ) { }

  ngOnInit(): void {

    if(this.data.content){
      this.commentFormGroup.setValue(
        {content: this.data.content,
          user: this.data.userName
        }
      ) 
    }

    this.formStatusSubscription = this.commentFormGroup.statusChanges.subscribe(
      status => {        
        if(status === 'VALID') {
          this.isSendCommentButtonDisabled = false;
        } else {
          this.isSendCommentButtonDisabled = true;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.formStatusSubscription.unsubscribe();
  }

// TODO Przy zamykaniu formularza (również kliknięcie poza oknem) zapisać treść posta wpisaną do okna

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onSendCommentClick(){
    this.isLoaderVisible = true;
    console.log('this.data.actionType', this.data.actionType);
    
    if(this.data.actionType === 'add'){
      this.restService.addComment(this.data.postId, this.commentFormGroup.get('content')?.value).subscribe(
        {
          next: (v) => this.dialogRef.close(true),
          error: (e) => console.error(e),
          complete: () => console.info('complete') 
        }
      )
    }

    if(this.data.actionType === 'edit'){
      console.log('EDYCJA - uzupełnij');
      this.isLoaderVisible = false;

    }

  }


}
